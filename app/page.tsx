"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ModelDiagram from "./ModelDiagram";
import SketchPad from "./SketchPad";
import {
  QUESTION_BANK,
  SUBJECTS,
  InterviewQuestion,
  SourceMode,
  SubjectId,
  sourceModeLabel,
  subjectById,
} from "./question-bank";
import {
  getFollowUp,
  getGuideText,
  getHints,
  getQuestionText,
  getSketchPrompt,
  Language,
} from "./question-locales";

type MainView = "practice" | "bank" | "history";
type PracticeStage = "landing" | "setup" | "session" | "results";

interface ResponseDraft {
  thoughts: string;
  answer: string;
  sketch: string;
  hintsUsed: number;
  showModel: boolean;
}

interface Diagnostic {
  questionId: string;
  overall: number;
  structure: number;
  subject: number;
  reasoning: number;
  flexibility: number;
  communication: number;
  wordCount: number;
  strengths: string[];
  improvements: string[];
  nextQuestion: string;
}

interface HistoryEntry {
  id: string;
  date: string;
  subject: SubjectId;
  sourceMode: SourceMode;
  score: number;
  hints: number;
  duration: number;
  questions: number;
}

const EMPTY_RESPONSE: ResponseDraft = {
  thoughts: "",
  answer: "",
  sketch: "",
  hintsUsed: 0,
  showModel: false,
};

type SpeechTarget = "thoughts" | "answer";

interface SpeechRecognitionResultLike {
  readonly length: number;
  [index: number]: { transcript: string };
}

interface SpeechRecognitionEventLike {
  readonly results: {
    readonly length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const CORE_DIAGRAMS: Partial<Record<string, InterviewQuestion["diagram"]>> = {
  "math-past-ladder": "circle-rectangle",
  "math-mock-tangent": "graph",
  "math-mock-random-chord": "circle-rectangle",
  "physics-past-ball": "velocity-time",
  "physics-past-ice": "forces",
  "physics-mock-coffee": "medical-curve",
  "eng-past-ruler": "forces",
  "eng-past-dam": "beam",
  "eng-mock-bridge": "velocity-time",
  "materials-mock-phone": "medical-curve",
  "chem-mock-rate": "energy-profile",
  "bio-mock-photosynthesis": "medical-curve",
  "med-mock-screening": "medical-curve",
  "econ-mock-tickets": "supply-demand",
  "econ-mock-cleaners": "argument-map",
  "ppe-mock-free-speech": "balance",
  "law-mock-height": "balance",
  "english-mock-unreliable": "argument-map",
};

function scoreLabels(language: Language) {
  return [
    ["structure", language === "zh" ? "回答结构" : "Structure"],
    ["subject", language === "zh" ? "学科基础" : "Subject knowledge"],
    ["reasoning", language === "zh" ? "推理深度" : "Reasoning"],
    ["flexibility", language === "zh" ? "思维弹性" : "Flexibility"],
    ["communication", language === "zh" ? "表达清晰度" : "Communication"],
  ] as const;
}

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function countWords(text: string) {
  const latinWords = text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
  const chineseChunks = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  return latinWords + Math.ceil(chineseChunks / 2);
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function diagnoseAnswer(
  question: InterviewQuestion,
  draft: ResponseDraft,
  language: Language,
): Diagnostic {
  const answer = draft.answer.trim();
  const combined = (draft.thoughts + " " + answer).toLowerCase();
  const wordCount = countWords(answer);
  const keywordHits = question.rubricKeywords.filter((keyword) =>
    combined.includes(keyword.toLowerCase()),
  ).length;
  const reasoningHits =
    combined.match(/\b(because|therefore|hence|so|since|implies?|leads? to|as a result|which means)\b/g)
      ?.length ?? 0;
  const reasoningHitsZh = combined.match(/因为|因此|所以|意味着|导致|由此|可知/g)?.length ?? 0;
  const assumptionHits =
    combined.match(/\b(assume|assuming|suppose|if|given|model|estimate|approximately|depends)\b/g)
      ?.length ?? 0;
  const assumptionHitsZh = combined.match(/假设|如果|设定|取决于|估计|近似|条件/g)?.length ?? 0;
  const alternativeHits =
    combined.match(/\b(however|although|alternatively|another|on the other hand|counter|whereas|but)\b/g)
      ?.length ?? 0;
  const alternativeHitsZh = combined.match(/但是|然而|另一方面|或者|反例|替代|相反/g)?.length ?? 0;
  const evidenceHits =
    combined.match(/\b(example|evidence|data|test|experiment|graph|equation|measure|compare|unit)\b/g)
      ?.length ?? 0;
  const evidenceHitsZh = combined.match(/例子|证据|数据|实验|图像|方程|测量|比较|单位/g)?.length ?? 0;
  const signpostingHits =
    combined.match(/\b(first|second|finally|initially|next|overall|in conclusion|I would begin)\b/g)
      ?.length ?? 0;
  const signpostingHitsZh = combined.match(/首先|其次|最后|第一|第二|总之|结论|先从/g)?.length ?? 0;
  const totalReasoningHits = reasoningHits + reasoningHitsZh;
  const totalAssumptionHits = assumptionHits + assumptionHitsZh;
  const totalAlternativeHits = alternativeHits + alternativeHitsZh;
  const totalEvidenceHits = evidenceHits + evidenceHitsZh;
  const totalSignpostingHits = signpostingHits + signpostingHitsZh;
  const sentences = answer.split(/[.!?。！？]+/).filter((part) => part.trim().length > 2).length;

  const structure = clamp(
    32 + Math.min(30, totalSignpostingHits * 9) + Math.min(22, sentences * 4) + (wordCount >= 80 ? 16 : wordCount / 5),
  );
  const subject = clamp(30 + keywordHits * 11 + Math.min(15, totalEvidenceHits * 3));
  const reasoning = clamp(28 + totalReasoningHits * 8 + totalAssumptionHits * 5 + Math.min(18, totalEvidenceHits * 4));
  const flexibility = clamp(32 + totalAlternativeHits * 13 + totalAssumptionHits * 4 + (combined.includes("limit") || combined.includes("边界") ? 8 : 0));
  const communication = clamp(
    35 +
      Math.min(30, wordCount / 3) +
      Math.min(20, sentences * 3) -
      (wordCount > 320 ? 12 : 0) -
      (sentences <= 1 && wordCount > 45 ? 12 : 0),
  );
  const overall = clamp(
    structure * 0.18 + subject * 0.23 + reasoning * 0.28 + flexibility * 0.16 + communication * 0.15,
  );

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (keywordHits >= 3) strengths.push(language === "zh" ? "能够调动与题目相关的学科概念，而不是停留在直觉判断。" : "You use relevant subject concepts rather than relying only on intuition.");
  if (totalReasoningHits >= 2) strengths.push(language === "zh" ? "因果链条较清楚，能解释结论是如何从前提推出的。" : "The causal chain is visible and the conclusion is connected to its premises.");
  if (totalAssumptionHits >= 2) strengths.push(language === "zh" ? "主动说明了假设或条件，体现出较好的建模意识。" : "You make assumptions explicit, showing good modelling awareness.");
  if (totalAlternativeHits >= 1) strengths.push(language === "zh" ? "注意到替代解释或反面情况，回答具有可修正性。" : "You consider an alternative or countercase and keep the answer revisable.");
  if (totalEvidenceHits >= 1 || draft.sketch) strengths.push(language === "zh" ? "尝试用数据、实验、方程、例子或草图检验自己的想法。" : "You test ideas with data, an experiment, equation, example or sketch.");
  if (strengths.length === 0) strengths.push(language === "zh" ? "已经给出了可继续追问的起点，没有回避陌生问题。" : "You provide a starting point that a tutor could productively question.");

  if (wordCount < 65) improvements.push(language === "zh" ? "回答偏短。建议补出“起点—推导—检验—结论”四个环节。" : "The answer is short. Add a starting point, derivation, test and conclusion.");
  if (keywordHits < 3) improvements.push((language === "zh" ? "更明确地调用本题的 A-Level 支点：" : "Use the A-Level anchors more explicitly: ") + question.anchors.join(language === "zh" ? "、" : ", ") + (language === "zh" ? "。" : "."));
  if (totalReasoningHits < 2) improvements.push(language === "zh" ? "不要只报结论；每提出一步，都说明依据以及它如何连接到下一步。" : "Do not only state the result; explain the basis of each step and how it leads to the next.");
  if (totalAssumptionHits < 1) improvements.push(language === "zh" ? "先声明关键假设，并说明改变假设后结论可能怎样变化。" : "State a key assumption and explain how changing it might alter the conclusion.");
  if (totalAlternativeHits < 1) improvements.push(language === "zh" ? "加入一个替代解释、边界情况或反例，再判断原观点是否仍成立。" : "Add an alternative explanation, boundary case or counterexample.");
  if (totalEvidenceHits < 1 && !draft.sketch) improvements.push(language === "zh" ? "提出一种可验证方法，例如画图、估算、设计实验或寻找反例。" : "Propose a check: draw, estimate, design an experiment or seek a counterexample.");
  if (wordCount > 280) improvements.push(language === "zh" ? "信息较多但主线容易被淹没；先给路线图，再保留最关键的两至三步。" : "The main line is becoming hidden; give a roadmap and keep the most important two or three steps.");
  if (improvements.length === 0) {
    improvements.push(language === "zh" ? "继续用导师追问检验结论：改变一个关键条件，并解释答案为什么随之改变。" : "Stress-test the conclusion: change one key condition and explain why the answer changes.");
  }

  return {
    questionId: question.id,
    overall,
    structure,
    subject,
    reasoning,
    flexibility,
    communication,
    wordCount,
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 4),
    nextQuestion: getFollowUp(question, language),
  };
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [mainView, setMainView] = useState<MainView>("practice");
  const [stage, setStage] = useState<PracticeStage>("landing");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>("mathematics");
  const [selectedSource, setSelectedSource] = useState<SourceMode>("past");
  const [questionCount, setQuestionCount] = useState(2);
  const [sessionQuestions, setSessionQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, ResponseDraft>>({});
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [bankSubject, setBankSubject] = useState<SubjectId | "all">("all");
  const [bankSource, setBankSource] = useState<SourceMode | "all">("all");
  const [sampleIndex, setSampleIndex] = useState(0);
  const [sampleHint, setSampleHint] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechTarget, setSpeechTarget] = useState<SpeechTarget | null>(null);
  const [speechMessage, setSpeechMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const labels = scoreLabels(language);
  const tx = (zh: string, en: string) => (language === "zh" ? zh : en);

  const heroSamples = useMemo(
    () => QUESTION_BANK.filter((question) => question.difficulty !== "Warm-up").slice(0, 8),
    [],
  );
  const sampleQuestion = heroSamples[sampleIndex % heroSamples.length];

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("perfect-oxbridge-history");
        if (saved) setHistory(JSON.parse(saved) as HistoryEntry[]);
        const savedLanguage = window.localStorage.getItem("perfect-oxbridge-language");
        if (savedLanguage === "en" || savedLanguage === "zh") setLanguage(savedLanguage);
      } catch {
        setHistory([]);
      }
      setSpeechSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  useEffect(() => {
    if (stage !== "session" || sessionStartedAt === null) return;
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStartedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage, sessionStartedAt]);

  const currentQuestion = sessionQuestions[currentIndex];
  const currentResponse = currentQuestion
    ? responses[currentQuestion.id] ?? EMPTY_RESPONSE
    : EMPTY_RESPONSE;

  const filteredBank = useMemo(
    () =>
      QUESTION_BANK.filter(
        (question) =>
          (bankSubject === "all" || question.subject === bankSubject) &&
          (bankSource === "all" || question.sourceMode === bankSource),
      ),
    [bankSource, bankSubject],
  );

  function openSetup() {
    setMainView("practice");
    setStage("setup");
    setValidationMessage("");
    window.setTimeout(() => setupRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function beginSession(singleQuestion?: InterviewQuestion) {
    const pool = singleQuestion
      ? [singleQuestion]
      : QUESTION_BANK.filter(
          (question) => question.subject === selectedSubject && question.sourceMode === selectedSource,
        );
    const picked = singleQuestion ? pool : shuffle(pool).slice(0, Math.min(questionCount, pool.length));
    const initialResponses = Object.fromEntries(
      picked.map((question) => [question.id, { ...EMPTY_RESPONSE }]),
    ) as Record<string, ResponseDraft>;
    setSessionQuestions(picked);
    setResponses(initialResponses);
    setCurrentIndex(0);
    setDiagnostics([]);
    setValidationMessage("");
    setElapsed(0);
    setSessionStartedAt(Date.now());
    setMainView("practice");
    setStage("session");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateResponse(patch: Partial<ResponseDraft>) {
    if (!currentQuestion) return;
    setResponses((previous) => ({
      ...previous,
      [currentQuestion.id]: {
        ...(previous[currentQuestion.id] ?? EMPTY_RESPONSE),
        ...patch,
      },
    }));
    setValidationMessage("");
  }

  function toggleLanguage() {
    recognitionRef.current?.stop();
    const next = language === "zh" ? "en" : "zh";
    if (stage === "results" && sessionQuestions.length > 0) {
      setDiagnostics(
        sessionQuestions.map((question) =>
          diagnoseAnswer(question, responses[question.id] ?? EMPTY_RESPONSE, next),
        ),
      );
    }
    setLanguage(next);
    setSpeechTarget(null);
    setSpeechMessage("");
    try {
      window.localStorage.setItem("perfect-oxbridge-language", next);
    } catch {
      // The selected language remains active for this browser session.
    }
  }

  function toggleSpeech(target: SpeechTarget) {
    if (speechTarget === target) {
      recognitionRef.current?.stop();
      setSpeechTarget(null);
      return;
    }

    const Constructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Constructor || !currentQuestion) {
      setSpeechSupported(false);
      setSpeechMessage(
        tx(
          "当前浏览器不支持语音转文字，请使用最新版 Chrome、Edge 或 Safari，或继续键盘输入。",
          "Speech-to-text is unavailable in this browser. Try a current Chrome, Edge or Safari, or continue typing.",
        ),
      );
      return;
    }

    recognitionRef.current?.stop();
    const recognition = new Constructor();
    const questionId = currentQuestion.id;
    const baseText = (responses[questionId]?.[target] ?? "").trim();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === "zh" ? "zh-CN" : "en-GB";
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = 0; index < event.results.length; index += 1) {
        transcript += event.results[index][0]?.transcript ?? "";
      }
      setResponses((previous) => ({
        ...previous,
        [questionId]: {
          ...(previous[questionId] ?? EMPTY_RESPONSE),
          [target]: baseText + (baseText && transcript ? " " : "") + transcript,
        },
      }));
    };
    recognition.onerror = (event) => {
      setSpeechMessage(
        event.error === "not-allowed"
          ? tx(
              "麦克风权限未开启。请允许此网站使用麦克风后重试。",
              "Microphone permission is blocked. Allow microphone access for this site and try again.",
            )
          : tx(
              "语音识别暂时中断，你已经转写的内容仍然保留。",
              "Speech recognition stopped unexpectedly; the transcript already captured is preserved.",
            ),
      );
      setSpeechTarget(null);
    };
    recognition.onend = () => {
      setSpeechTarget(null);
      recognitionRef.current = null;
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setSpeechTarget(target);
      setSpeechMessage(
        tx(
          "正在听取中文回答；点击红色按钮即可停止。",
          "Listening in English; press the red button to stop.",
        ),
      );
    } catch {
      setSpeechTarget(null);
      setSpeechMessage(
        tx(
          "无法启动麦克风，请检查浏览器权限后重试。",
          "The microphone could not start. Check browser permissions and try again.",
        ),
      );
    }
  }

  function revealNextHint() {
    if (currentResponse.hintsUsed < 3) {
      updateResponse({ hintsUsed: currentResponse.hintsUsed + 1 });
    } else {
      updateResponse({ showModel: true });
    }
  }

  function completeAndDiagnose() {
    const unanswered = sessionQuestions.find(
      (question) => countWords(responses[question.id]?.answer ?? "") < 12,
    );
    if (unanswered) {
      const number = sessionQuestions.findIndex((question) => question.id === unanswered.id) + 1;
      setValidationMessage(
        language === "zh"
          ? "第 " + number + " 题的模拟回答还太短。请至少完整说出你的起点和一段推理。"
          : "Your response to question " + number + " is still too short. State a starting point and at least one complete reasoning step.",
      );
      setCurrentIndex(number - 1);
      return;
    }

    const result = sessionQuestions.map((question) =>
      diagnoseAnswer(question, responses[question.id] ?? EMPTY_RESPONSE, language),
    );
    setDiagnostics(result);
    const score = Math.round(result.reduce((sum, item) => sum + item.overall, 0) / result.length);
    const hints = sessionQuestions.reduce(
      (sum, question) => sum + (responses[question.id]?.hintsUsed ?? 0),
      0,
    );
    const entry: HistoryEntry = {
      id: String(Date.now()) + "-" + Math.random().toString(36).slice(2),
      date: new Date().toISOString(),
      subject: sessionQuestions[0].subject,
      sourceMode: sessionQuestions[0].sourceMode,
      score,
      hints,
      duration: elapsed,
      questions: sessionQuestions.length,
    };
    const nextHistory = [entry, ...history].slice(0, 20);
    setHistory(nextHistory);
    try {
      window.localStorage.setItem("perfect-oxbridge-history", JSON.stringify(nextHistory));
    } catch {
      // The results remain available for this browser session.
    }
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetPractice() {
    recognitionRef.current?.stop();
    setSpeechTarget(null);
    setSpeechMessage("");
    setStage("setup");
    setSessionQuestions([]);
    setResponses({});
    setDiagnostics([]);
    setValidationMessage("");
    setElapsed(0);
    setSessionStartedAt(null);
  }

  function navigate(view: MainView) {
    setMainView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const averageScore = diagnostics.length
    ? Math.round(diagnostics.reduce((sum, item) => sum + item.overall, 0) / diagnostics.length)
    : 0;
  const averageDimensions = diagnostics.length
    ? Object.fromEntries(
        labels.map(([key]) => [
          key,
          Math.round(diagnostics.reduce((sum, item) => sum + item[key], 0) / diagnostics.length),
        ]),
      )
    : {};

  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => {
            setMainView("practice");
            setStage("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label={tx("返回首页", "Return home")}
        >
          <span className="brand-name">Perfect Oxbridge Interview</span>
          <span className="brand-subtitle">{tx("牛剑面试思维训练", "Oxford & Cambridge interview training")}</span>
        </button>
        <nav className="main-nav" aria-label={tx("主导航", "Main navigation")}>
          {([
            ["practice", tx("练习台", "Practice")],
            ["bank", tx("题库", "Question bank")],
            ["history", tx("学习记录", "History")],
          ] as [MainView, string][]).map(([view, label]) => (
            <button
              key={view}
              className={mainView === view ? "nav-link active" : "nav-link"}
              onClick={() => navigate(view)}
            >
              {label}
            </button>
          ))}
        </nav>
        <button className="language-toggle" onClick={toggleLanguage} aria-label={tx("切换到英文", "Switch to Chinese")}>
          <span className={language === "zh" ? "active" : ""}>中</span>
          <i>/</i>
          <span className={language === "en" ? "active" : ""}>EN</span>
        </button>
        <div className="header-mark" aria-hidden="true">
          POI
        </div>
      </header>

      {mainView === "practice" && stage === "landing" && (
        <main>
          <section className="hero">
            <div className="margin-ruler" aria-hidden="true">
              <span>01</span>
            </div>
            <div className="hero-copy">
              <p className="eyebrow">THE TUTORIAL METHOD</p>
              <h1>
                {tx("大声思考。", "Think aloud.")}
                <br />
                {tx("推得更深。", "Go deeper.")}
              </h1>
              <p className="hero-cn">{tx("像导师一样追问，像学者一样思考", "Question like a tutor. Think like a scholar.")}</p>
              <div className="ornament-line" aria-hidden="true">
                <span />
              </div>
              <p className="hero-description">
                {tx("从 A-Level 知识出发，在陌生问题里展示推理。", "Start from A-Level knowledge and make your reasoning visible on unfamiliar problems.")}
                <br />
                {tx("100+ 道真题与模拟题、递进提示、语音回答、草图与诊断，集中在一次完整练习中。", "100+ past and original questions, progressive hints, voice answers, sketches and diagnosis in one complete practice loop.")}
              </p>
              <button className="primary-button hero-cta" onClick={openSetup}>
                {tx("开始模拟面试", "Start a mock interview")} <span aria-hidden="true">→</span>
              </button>
              <p className="micro-copy">{tx("A-Level 知识 · 苏格拉底式引导 · 有依据的反馈", "A-Level knowledge · Socratic guidance · Evidence-led feedback")}</p>
            </div>

            <div className="hero-practice-card">
              <div className="card-topline">
                <span className="subject-pill">{subjectById(sampleQuestion.subject).nameEn}</span>
                <span className="source-tag">
                  {sampleQuestion.sourceMode === "past" ? "Past question" : "Perfect mock"}
                </span>
              </div>
              <div className="question-number">QUESTION PREVIEW</div>
              <h2>{getQuestionText(sampleQuestion, language)}</h2>
              <div className={sampleHint ? "preview-answer revealed" : "preview-answer"}>
                {sampleHint ? getHints(sampleQuestion, language)[0] : tx("说出你的思路，而不只是答案……", "Talk through your reasoning, not only the answer…")}
              </div>
              <div className="hint-preview">
                <div className="hint-preview-label">
                  <span className="bulb">?</span>
                  {tx("三层递进提示", "Three progressive hints")}
                </div>
                <div className="hint-rail" aria-label={tx("三层提示", "Three hints")}>
                  {[1, 2, 3].map((step) => (
                    <span key={step} className={sampleHint && step === 1 ? "active" : ""}>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
              <div className="preview-actions">
                <button className="text-button" onClick={() => setSampleHint((shown) => !shown)}>
                  {sampleHint ? tx("收起提示", "Hide hint") : tx("试用提示", "Try a hint")}
                </button>
                <button
                  className="outline-button"
                  onClick={() => {
                    setSampleIndex((index) => (index + 1) % heroSamples.length);
                    setSampleHint(false);
                  }}
                >
                  {tx("换一道题", "Another question")} <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            <div className="hero-grid-decoration" aria-hidden="true" />
          </section>

          <section className="method-strip" aria-label={tx("平台特点", "Platform features")}>
            <div>
              <strong>{SUBJECTS.length}</strong>
              <span>{tx("核心申请学科", "core subjects")}</span>
            </div>
            <div>
              <strong>{QUESTION_BANK.length}</strong>
              <span>{tx("双语面试题", "bilingual questions")}</span>
            </div>
            <div>
              <strong>3</strong>
              <span>{tx("层层递进提示", "progressive hints")}</span>
            </div>
            <div>
              <strong>5</strong>
              <span>{tx("诊断评分维度", "diagnostic dimensions")}</span>
            </div>
          </section>

          <section className="how-it-works">
            <p className="section-kicker">THE PRACTICE LOOP</p>
            <h2>{tx("真正要练的，是答案形成的过程。", "Practise how the answer is formed, not only the final line.")}</h2>
            <div className="method-cards">
              <article>
                <span>01</span>
                <h3>{tx("选择学科与题型", "Choose subject and source")}</h3>
                <p>{tx("在牛剑真题与 Perfect 自研题之间切换，系统从 100+ 题库随机组卷。", "Switch between past questions and Perfect originals, then draw a random set from 100+ prompts.")}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{tx("说出来，也画出来", "Say it and sketch it")}</h3>
                <p>{tx("键盘或语音输入回答，并用鼠标、触控笔或手指画图；卡住时逐层解锁引导。", "Type or dictate an answer and sketch with a mouse, stylus or finger; unlock only the hint you need.")}</p>
              </article>
              <article>
                <span>03</span>
                <h3>{tx("诊断并再次追问", "Diagnose and question again")}</h3>
                <p>{tx("查看五维诊断、详细示范解析与可视化图示，定位下一步训练重点。", "Use five-dimensional feedback, detailed model analysis and visual diagrams to choose the next improvement.")}</p>
              </article>
            </div>
          </section>

          <section className="final-cta">
            <div>
              <p className="section-kicker">READY WHEN YOU ARE</p>
              <h2>{tx("下一道陌生题，正是训练开始的地方。", "The next unfamiliar question is where the training begins.")}</h2>
            </div>
            <button className="primary-button" onClick={openSetup}>
              {tx("配置我的练习", "Set up my practice")} <span aria-hidden="true">→</span>
            </button>
          </section>
        </main>
      )}

      {mainView === "practice" && stage === "setup" && (
        <main className="workspace-page setup-page" ref={setupRef}>
          <div className="page-heading">
            <div>
              <p className="section-kicker">BUILD YOUR TUTORIAL</p>
              <h1>{tx("配置一场模拟面试", "Build a mock interview")}</h1>
              <p>{tx("先选择学科，再决定使用真题还是自研模拟题。每次组卷都会随机改变。", "Choose a subject and then a past or original question source. Every set is randomised.")}</p>
            </div>
            <button className="quiet-button" onClick={() => setStage("landing")}>
              {tx("返回首页", "Back home")}
            </button>
          </div>

          <section className="setup-block">
            <div className="setup-step">
              <span>01</span>
              <div>
                <h2>{tx("选择申请学科", "Choose your subject")}</h2>
                <p>{tx("提示和诊断都会调用对应的 A-Level 知识支点。", "Hints and diagnosis use the relevant A-Level knowledge anchors.")}</p>
              </div>
            </div>
            <div className="subject-grid">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  className={selectedSubject === subject.id ? "subject-choice selected" : "subject-choice"}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <span className="subject-icon">{subject.icon}</span>
                  <span>
                    <strong>{language === "zh" ? subject.name : subject.nameEn}</strong>
                    <small>{language === "zh" ? subject.nameEn : subject.family}</small>
                  </span>
                  <span className="choice-check">{selectedSubject === subject.id ? "✓" : ""}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="setup-block setup-options">
            <div className="setup-step">
              <span>02</span>
              <div>
                <h2>{tx("选择题目来源", "Choose the question source")}</h2>
                <p>{tx("真题保持原始思维重点；自研题围绕相同的牛剑面试能力设计。", "Past prompts preserve their original reasoning focus; original prompts target the same interview skills.")}</p>
              </div>
            </div>
            <div className="source-choices">
              <button
                className={selectedSource === "past" ? "source-choice selected" : "source-choice"}
                onClick={() => setSelectedSource("past")}
              >
                <span className="radio-dot" />
                <span>
                  <strong>{tx("牛剑真题 / 官方例题", "Past / official sample questions")}</strong>
                  <small>{tx("整理自你提供的 Oxford 示例与往年题目资料", "Curated from the Oxford examples and interview materials you provided")}</small>
                </span>
              </button>
              <button
                className={selectedSource === "mock" ? "source-choice selected" : "source-choice"}
                onClick={() => setSelectedSource("mock")}
              >
                <span className="radio-dot" />
                <span>
                  <strong>{tx("Perfect 自研模拟题", "Perfect original mock questions")}</strong>
                  <small>{tx("基于 A-Level 知识设计的陌生情境与追问", "Unfamiliar scenarios and follow-ups built from A-Level knowledge")}</small>
                </span>
              </button>
            </div>
          </section>

          <section className="setup-block compact-options">
            <div className="setup-step">
              <span>03</span>
              <div>
                <h2>{tx("本轮题量", "Questions this session")}</h2>
                <p>{tx("建议先完成两题，诊断才能比较你的稳定表现。", "Two questions help the diagnosis compare the consistency of your performance.")}</p>
              </div>
            </div>
            <div className="count-picker" role="group" aria-label={tx("本轮题量", "Questions this session")}>
              {[1, 2].map((count) => (
                <button
                  key={count}
                  className={questionCount === count ? "selected" : ""}
                  onClick={() => setQuestionCount(count)}
                >
                  <strong>{count}</strong>
                  <span>{count === 1 ? tx("单题精练", "One-question focus") : tx("完整练习", "Full practice")}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="setup-summary">
            <div>
              <span>{tx("本轮配置", "Your session")}</span>
              <strong>
                {language === "zh" ? subjectById(selectedSubject).name : subjectById(selectedSubject).nameEn} · {language === "zh" ? sourceModeLabel[selectedSource] : selectedSource === "past" ? "Past questions" : "Perfect originals"} · {questionCount} {tx("题", questionCount === 1 ? "question" : "questions")}
              </strong>
            </div>
            <button className="primary-button" onClick={() => beginSession()}>
              {tx("随机生成题组", "Generate a random set")} <span aria-hidden="true">→</span>
            </button>
          </div>
        </main>
      )}

      {mainView === "practice" && stage === "session" && currentQuestion && (
        <main className="interview-page">
          <aside className="session-sidebar">
            <div className="session-brand">
              <span>LIVE TUTORIAL</span>
              <strong>{language === "zh" ? subjectById(currentQuestion.subject).name : subjectById(currentQuestion.subject).nameEn}</strong>
            </div>
            <div className="session-clock">
              <small>{tx("思考时间", "Thinking time")}</small>
              <strong>{formatTime(elapsed)}</strong>
            </div>
            <ol className="question-nav">
              {sessionQuestions.map((question, index) => {
                const completed = countWords(responses[question.id]?.answer ?? "") >= 12;
                return (
                  <li key={question.id}>
                    <button
                      className={index === currentIndex ? "active" : ""}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <strong>Question {index + 1}</strong>
                        <small>{completed ? tx("已作答", "Answered") : index === currentIndex ? tx("正在思考", "In progress") : tx("未作答", "Not answered")}</small>
                      </span>
                      <span className={completed ? "status-dot complete" : "status-dot"} />
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="sidebar-note">
              <strong>{tx("面试提醒", "Interview reminder")}</strong>
              <p>{tx("先说你准备如何拆题。被提示后及时修正，比坚持一个错误答案更重要。", "Say how you will break the problem down. Revising after a hint matters more than defending a wrong answer.")}</p>
            </div>
            <button className="quiet-button full" onClick={resetPractice}>
              {tx("结束本轮", "End session")}
            </button>
          </aside>

          <section className="interview-workspace">
            <div className="question-meta">
              <div>
                <span className="subject-pill">{subjectById(currentQuestion.subject).nameEn}</span>
                <span className="difficulty-tag">{currentQuestion.difficulty}</span>
              </div>
              <span className="session-progress">
                {currentIndex + 1} / {sessionQuestions.length}
              </span>
            </div>

            <article className="question-panel">
              <p className="question-source">
                {currentQuestion.origin} · {currentQuestion.sourceTitle}
              </p>
              <h1>{getQuestionText(currentQuestion, language)}</h1>
              <p className="question-guide">{getGuideText(currentQuestion, language)}</p>
              <div className="anchor-row">
                <span>{tx("A-Level 支点", "A-Level anchors")}</span>
                {currentQuestion.anchors.map((anchor) => (
                  <em key={anchor}>{anchor}</em>
                ))}
              </div>
            </article>

            <div className="response-layout">
              <section className="answer-panel">
                <div className="answer-field">
                  <div className="answer-field-heading">
                    <label htmlFor="thoughts">
                      <span>
                        <strong>{tx("思路草稿", "Reasoning notes")}</strong>
                        <small>{tx("记录假设、图形、反例或推导路线", "Capture assumptions, diagrams, countercases or a route through the problem")}</small>
                      </span>
                      <span>{countWords(currentResponse.thoughts)} {tx("词", "words")}</span>
                    </label>
                    <button
                      type="button"
                      className={speechTarget === "thoughts" ? "voice-button listening" : "voice-button"}
                      onClick={() => toggleSpeech("thoughts")}
                      disabled={!speechSupported}
                    >
                      <span aria-hidden="true">{speechTarget === "thoughts" ? "■" : "●"}</span>
                      {speechTarget === "thoughts" ? tx("停止", "Stop") : tx("语音输入", "Dictate")}
                    </button>
                  </div>
                  <textarea
                    id="thoughts"
                    value={currentResponse.thoughts}
                    onChange={(event) => updateResponse({ thoughts: event.target.value })}
                    placeholder={tx("我先把问题拆成……", "I would begin by defining…")}
                  />
                </div>

                <div className="answer-field">
                  <div className="answer-field-heading">
                    <label htmlFor="answer">
                      <span>
                        <strong>{tx("模拟口头回答", "Spoken interview answer")}</strong>
                        <small>{tx("像面对导师一样，把推理完整说出来", "Answer as if speaking to a tutor and make every reasoning step audible")}</small>
                      </span>
                      <span>{countWords(currentResponse.answer)} {tx("词", "words")}</span>
                    </label>
                    <button
                      type="button"
                      className={speechTarget === "answer" ? "voice-button listening" : "voice-button"}
                      onClick={() => toggleSpeech("answer")}
                      disabled={!speechSupported}
                    >
                      <span aria-hidden="true">{speechTarget === "answer" ? "■" : "●"}</span>
                      {speechTarget === "answer" ? tx("停止录入", "Stop") : tx("用麦克风回答", "Answer by voice")}
                    </button>
                  </div>
                  <textarea
                    id="answer"
                    className="main-answer"
                    value={currentResponse.answer}
                    onChange={(event) => updateResponse({ answer: event.target.value })}
                    placeholder={tx("我的第一个假设是……", "My first assumption would be…")}
                  />
                </div>

                <div className={speechTarget ? "speech-status active" : "speech-status"}>
                  <span aria-hidden="true">●</span>
                  {speechMessage || (speechSupported
                    ? tx("可选择中文或英语识别；浏览器会在首次使用时请求麦克风权限。", "Choose Chinese or English recognition. Your browser will request microphone permission on first use.")
                    : tx("此浏览器不支持语音识别，请继续使用键盘输入。", "Speech recognition is not supported here; please continue typing."))}
                </div>

                <SketchPad
                  language={language}
                  value={currentResponse.sketch}
                  prompt={getSketchPrompt(currentQuestion, language)}
                  onChange={(sketch) => updateResponse({ sketch })}
                />
              </section>

              <aside className="guidance-panel">
                <div className="guidance-heading">
                  <span className="bulb">?</span>
                  <div>
                    <strong>Socratic hints</strong>
                    <small>{tx("每次只解锁一层", "Unlock one layer at a time")}</small>
                  </div>
                  <span>{currentResponse.hintsUsed}/3</span>
                </div>
                <div className="hint-progress">
                  {[1, 2, 3].map((step) => (
                    <span key={step} className={currentResponse.hintsUsed >= step ? "active" : ""}>
                      {step}
                    </span>
                  ))}
                </div>
                <div className="revealed-hints">
                  {currentResponse.hintsUsed === 0 && (
                    <div className="hint-placeholder">
                      <p>{tx("如果你暂时没有思路，提示会从 A-Level 知识出发逐步追问，不会直接跳到答案。", "If you are stuck, each prompt starts from A-Level knowledge and guides the next inference without jumping to the answer.")}</p>
                    </div>
                  )}
                  {getHints(currentQuestion, language).slice(0, currentResponse.hintsUsed).map((hint, index) => (
                    <div className="hint-item" key={hint}>
                      <span>Hint {index + 1}</span>
                      <p>{hint}</p>
                    </div>
                  ))}
                </div>
                <button className="hint-button" onClick={revealNextHint}>
                  {currentResponse.hintsUsed < 3
                    ? tx("解锁第 " + (currentResponse.hintsUsed + 1) + " 层提示", "Unlock hint " + (currentResponse.hintsUsed + 1))
                    : currentResponse.showModel
                      ? tx("详细示范解析已解锁", "Detailed model analysis unlocked")
                      : tx("我仍然卡住：查看详细示范解析", "Still stuck: open the detailed model analysis")}
                </button>

                {currentResponse.showModel && (
                  <div className="model-answer">
                    <span>DETAILED MODEL · {tx("详细示范解析", "DETAILED ANALYSIS")}</span>
                    <div className="model-breakdown">
                      {getHints(currentQuestion, language).map((hint, index) => (
                        <article key={hint}>
                          <em>0{index + 1}</em>
                          <div>
                            <strong>
                              {index === 0
                                ? tx("确定起点与假设", "Frame the problem")
                                : index === 1
                                  ? tx("展开核心推导", "Develop the reasoning")
                                  : tx("检验并限定结论", "Test and qualify")}
                            </strong>
                            <p>{hint}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="full-model-response">
                      <h4>{tx("完整英文示范回答", "Full model response")}</h4>
                      <p>{language === "zh" && currentQuestion.modelAnswerZh ? currentQuestion.modelAnswerZh : currentQuestion.modelAnswer}</p>
                      {language === "zh" && !currentQuestion.modelAnswerZh && (
                        <small>示范回答保留英文，帮助你练习真实面试中的完整表达；上方已提供中文分步拆解。</small>
                      )}
                    </div>
                    {(currentQuestion.diagram ?? CORE_DIAGRAMS[currentQuestion.id]) && (
                      <ModelDiagram
                        kind={(currentQuestion.diagram ?? CORE_DIAGRAMS[currentQuestion.id])!}
                        language={language}
                      />
                    )}
                    <div className="model-quality">
                      <h4>{tx("为什么这是一份强回答", "Why this is a strong answer")}</h4>
                      <ul>
                        <li>{tx("从明确假设出发，不把直觉当作结论。", "It begins from explicit assumptions rather than treating intuition as a conclusion.")}</li>
                        <li>{tx("主动调用 A-Level 支点：", "It actively uses the A-Level anchors: ")} {currentQuestion.anchors.join(" · ")}</li>
                        <li>{tx("给出可被导师追问、修正或检验的推理链。", "It creates a reasoning chain that a tutor can question, test and revise.")}</li>
                      </ul>
                      <div>
                        <span>{tx("导师下一问", "Likely tutor follow-up")}</span>
                        <strong>{getFollowUp(currentQuestion, language)}</strong>
                      </div>
                    </div>
                    <small>{tx("这不是唯一标准答案。请学习它的结构、图示与自我检验方式，不要背诵措辞。", "This is not the only valid answer. Learn its structure, visual reasoning and self-checks rather than memorising the wording.")}</small>
                  </div>
                )}
              </aside>
            </div>

            {validationMessage && <div className="validation-message">{validationMessage}</div>}

            <div className="session-actions">
              <button
                className="quiet-button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
              >
                ← {tx("上一题", "Previous")}
              </button>
              {currentIndex < sessionQuestions.length - 1 ? (
                <button
                  className="primary-button compact"
                  onClick={() => setCurrentIndex((index) => Math.min(sessionQuestions.length - 1, index + 1))}
                >
                  {tx("保存并进入下一题", "Save and continue")} →
                </button>
              ) : (
                <button className="primary-button compact" onClick={completeAndDiagnose}>
                  {tx("完成并进行回答诊断", "Complete and diagnose")} →
                </button>
              )}
            </div>
          </section>
        </main>
      )}

      {mainView === "practice" && stage === "results" && diagnostics.length > 0 && (
        <main className="workspace-page results-page">
          <div className="results-hero">
            <div className="score-seal">
              <span>OVERALL</span>
              <strong>{averageScore}</strong>
              <small>/ 100</small>
            </div>
            <div>
              <p className="section-kicker">TUTORIAL DIAGNOSIS</p>
              <h1>{averageScore >= 80 ? tx("推理已经有学者的轮廓。", "Your reasoning is taking on a scholarly shape.") : averageScore >= 65 ? tx("方向正确，下一步是把推理说完整。", "The direction is sound; now make the whole chain audible.") : tx("你已经开始思考；现在需要让过程变得可见。", "You have started thinking; now make the process visible.")}</h1>
              <p>
                {tx(
                  "本轮完成 " + sessionQuestions.length + " 题，用时 " + formatTime(elapsed) + "。诊断重点不是判断“聪不聪明”，而是识别你能否调用知识、接受提示并把复杂想法清楚展开。",
                  "You completed " + sessionQuestions.length + (sessionQuestions.length === 1 ? " question" : " questions") + " in " + formatTime(elapsed) + ". The diagnosis asks whether you can use knowledge, respond to prompts and communicate complex reasoning clearly.",
                )}
              </p>
            </div>
          </div>

          <section className="dimension-card">
            <div className="dimension-intro">
              <span>{tx("五维表现", "Five dimensions")}</span>
              <p>{tx("分数来自回答中的结构、学科概念、推理语言、替代解释、草图使用与表达完整度。", "Scores reflect structure, subject concepts, reasoning language, alternatives, use of sketches and completeness.")}</p>
            </div>
            <div className="score-bars">
              {labels.map(([key, label]) => {
                const value = Number(averageDimensions[key] ?? 0);
                return (
                  <div className="score-row" key={key}>
                    <span>{label}</span>
                    <div>
                      <i style={{ width: value + "%" }} />
                    </div>
                    <strong>{value}</strong>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="question-diagnostics">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">QUESTION BY QUESTION</p>
                <h2>{tx("逐题诊断", "Question-by-question diagnosis")}</h2>
              </div>
              <span>{tx("点击每题可回看你的作答重点", "Open each question to review the evidence")}</span>
            </div>
            {diagnostics.map((diagnostic, index) => {
              const question = sessionQuestions[index];
              const response = responses[question.id];
              return (
                <details className="diagnostic-item" key={diagnostic.questionId} open={index === 0}>
                  <summary>
                    <span className="diagnostic-number">0{index + 1}</span>
                    <span>
                      <strong>{getQuestionText(question, language)}</strong>
                      <small>
                        {diagnostic.wordCount} {tx("词", "words")} · {tx("使用", "used")} {response.hintsUsed} {tx("次提示", response.hintsUsed === 1 ? "hint" : "hints")}
                      </small>
                    </span>
                    <span className="diagnostic-score">{diagnostic.overall}</span>
                  </summary>
                  <div className="diagnostic-body">
                    <div className="feedback-column positive">
                      <h3>{tx("做得好的地方", "What worked well")}</h3>
                      <ul>
                        {diagnostic.strengths.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="feedback-column improve">
                      <h3>{tx("下一步怎么改", "What to improve next")}</h3>
                      <ul>
                        {diagnostic.improvements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="follow-up-box">
                      <span>{tx("导师可能继续追问", "A likely tutor follow-up")}</span>
                      <strong>{diagnostic.nextQuestion}</strong>
                    </div>
                    {response.sketch && (
                      <div className="diagnostic-sketch">
                        <span>{tx("你的作答草图", "Your working sketch")}</span>
                        {/* A session-local canvas data URL is intentionally rendered without image optimisation. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={response.sketch} alt={tx("学生本题草图", "Student sketch for this question")} />
                      </div>
                    )}
                  </div>
                </details>
              );
            })}
          </section>

          <section className="results-actions">
            <div>
              <strong>{tx("把同一学科再练一次，观察分数是否稳定。", "Repeat the subject and see whether the score is stable.")}</strong>
              <span>{tx("题组会重新随机生成，学习记录保存在当前浏览器。", "A fresh set will be randomised; history stays in this browser.")}</span>
            </div>
            <button className="quiet-button" onClick={() => navigate("history")}>
              {tx("查看学习记录", "View history")}
            </button>
            <button className="primary-button compact" onClick={resetPractice}>
              {tx("再练一轮", "Practise again")} →
            </button>
          </section>
        </main>
      )}

      {mainView === "bank" && (
        <main className="workspace-page bank-page">
          <div className="page-heading">
            <div>
              <p className="section-kicker">CURATED QUESTION BANK</p>
              <h1>{tx("牛剑面试题库", "Oxbridge interview question bank")}</h1>
              <p>{tx("当前收录 " + QUESTION_BANK.length + " 道双语真题与原创模拟题；每题都有三层提示、详细解析和草图板。", QUESTION_BANK.length + " bilingual past and original questions, each with three hints, detailed analysis and a sketch pad.")}</p>
            </div>
            <div className="bank-count">
              <strong>{filteredBank.length}</strong>
              <span>{tx("道题", "questions")}</span>
            </div>
          </div>

          <div className="bank-filters">
            <label>
              <span>{tx("学科", "Subject")}</span>
              <select
                aria-label={tx("学科筛选", "Subject filter")}
                value={bankSubject}
                onChange={(event) => setBankSubject(event.target.value as SubjectId | "all")}
              >
                <option value="all">{tx("全部学科", "All subjects")}</option>
                {SUBJECTS.map((subject) => (
                  <option value={subject.id} key={subject.id}>
                    {language === "zh" ? subject.name + " · " + subject.nameEn : subject.nameEn}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{tx("来源", "Source")}</span>
              <select
                aria-label={tx("来源筛选", "Source filter")}
                value={bankSource}
                onChange={(event) => setBankSource(event.target.value as SourceMode | "all")}
              >
                <option value="all">{tx("全部来源", "All sources")}</option>
                <option value="past">{tx("牛剑真题 / 官方例题", "Past / official samples")}</option>
                <option value="mock">{tx("Perfect 自研模拟题", "Perfect originals")}</option>
              </select>
            </label>
          </div>

          <div className="bank-grid">
            {filteredBank.map((question, index) => (
              <article className="bank-card" key={question.id}>
                <div className="bank-card-top">
                  <span>{subjectById(question.subject).nameEn}</span>
                  <div className="bank-card-tags">
                    <span className={question.sourceMode === "past" ? "past" : "mock"}>
                      {question.sourceMode === "past" ? "PAST" : "MOCK"}
                    </span>
                    {(question.diagram ?? CORE_DIAGRAMS[question.id]) && (
                      <span className="draw-badge">{tx("画图题", "VISUAL")}</span>
                    )}
                  </div>
                </div>
                <span className="bank-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{getQuestionText(question, language)}</h2>
                <p>{getGuideText(question, language)}</p>
                <div className="bank-anchors">
                  {question.anchors.map((anchor) => (
                    <span key={anchor}>{anchor}</span>
                  ))}
                </div>
                <div className="bank-card-footer">
                  <small>{question.origin}</small>
                  <button onClick={() => beginSession(question)}>{tx("练习此题", "Practise this question")} →</button>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      {mainView === "history" && (
        <main className="workspace-page history-page">
          <div className="page-heading">
            <div>
              <p className="section-kicker">YOUR PRACTICE RECORD</p>
              <h1>{tx("学习记录", "Practice history")}</h1>
              <p>{tx("记录保存在当前浏览器，用于观察同一学科在多轮练习中的稳定性。", "Records stay in this browser so you can track consistency across repeated sessions.")}</p>
            </div>
            {history.length > 0 && (
              <button
                className="quiet-button"
                onClick={() => {
                  setHistory([]);
                  window.localStorage.removeItem("perfect-oxbridge-history");
                }}
              >
                {tx("清空记录", "Clear history")}
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <section className="empty-history">
              <span className="empty-mark">∴</span>
              <h2>{tx("这里还没有练习记录", "No practice history yet")}</h2>
              <p>{tx("完成一次模拟面试和回答诊断后，你的表现趋势会出现在这里。", "Complete a mock interview and diagnosis to start seeing your performance trend.")}</p>
              <button className="primary-button compact" onClick={openSetup}>
                {tx("开始第一次练习", "Start your first practice")} →
              </button>
            </section>
          ) : (
            <>
              <section className="history-summary">
                <div>
                  <span>{tx("已完成练习", "Sessions completed")}</span>
                  <strong>{history.length}</strong>
                </div>
                <div>
                  <span>{tx("平均诊断分", "Average score")}</span>
                  <strong>
                    {Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length)}
                  </strong>
                </div>
                <div>
                  <span>{tx("累计回答题数", "Questions answered")}</span>
                  <strong>{history.reduce((sum, item) => sum + item.questions, 0)}</strong>
                </div>
              </section>
              <section className="history-list">
                <div className="history-row history-head">
                  <span>{tx("日期", "Date")}</span>
                  <span>{tx("学科", "Subject")}</span>
                  <span>{tx("题目来源", "Source")}</span>
                  <span>{tx("题数 / 用时", "Questions / time")}</span>
                  <span>{tx("提示", "Hints")}</span>
                  <span>{tx("诊断分", "Score")}</span>
                </div>
                {history.map((entry) => (
                  <div className="history-row" key={entry.id}>
                    <span>{new Date(entry.date).toLocaleDateString(language === "zh" ? "zh-CN" : "en-GB")}</span>
                    <strong>{language === "zh" ? subjectById(entry.subject).name : subjectById(entry.subject).nameEn}</strong>
                    <span>{entry.sourceMode === "past" ? tx("真题", "Past") : tx("自研题", "Original")}</span>
                    <span>
                      {entry.questions} {tx("题", entry.questions === 1 ? "question" : "questions")} · {formatTime(entry.duration)}
                    </span>
                    <span>{entry.hints} {tx("次", "used")}</span>
                    <span className="history-score">{entry.score}</span>
                  </div>
                ))}
              </section>
            </>
          )}
        </main>
      )}

      <footer className="site-footer">
        <div>
          <strong>Perfect Oxbridge Interview</strong>
          <span>{tx("大声思考。推得更深。", "Think aloud. Go deeper.")}</span>
        </div>
        <p>
          {tx(
            "真题部分根据用户提供的 Oxford 示例与牛剑面试资料整理；部分题干为适配练习而精简。本平台与 Oxford 或 Cambridge University 无隶属关系。",
            "Past questions are curated from the Oxford samples and interview materials supplied by the user; some wording is shortened for practice. This platform is not affiliated with the University of Oxford or the University of Cambridge.",
          )}
        </p>
      </footer>
    </div>
  );
}
