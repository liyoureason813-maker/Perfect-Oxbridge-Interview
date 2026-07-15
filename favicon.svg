import type { InterviewQuestion } from "./question-bank";

export type Language = "zh" | "en";

const CORE_QUESTION_ZH: Record<string, string> = {
  "math-past-ladder": "一架梯子斜靠在竖直墙面上。当梯子滑落到地面时，其中点会描出什么曲线？",
  "math-past-average-speed": "我以速度 v 沿固定路线去参加面试。返程需要多快，才能使往返平均速度达到 2v？",
  "math-mock-tangent": "曲线 y=x² 在 x=a 处的切线与 x 轴交于 P。随着 a 改变，P 与 a 有什么关系？",
  "math-mock-random-chord": "“随机选择一条圆的弦”是什么意思？不同合理方法会不会对弦长超过内接等边三角形边长给出不同概率？",
  "cs-past-pirates": "七名完全理性的海盗分 100 枚金币。最资深者提案，至少半数赞成即通过，否则提案者被扔下船。他应如何分配？",
  "cs-past-lily": "青蛙从第 0 块荷叶出发，每次向前跳 1 或 2 块。到达第 10 块共有多少种不同方法？",
  "cs-mock-search": "一百万条学生记录按姓氏排序，同一姓氏可能重复。如何高效找到所有匹配记录？",
  "cs-mock-fair-ai": "一个招生模型对两组人的总体准确率相同，但假阴性率差异很大。它公平吗？",
  "physics-past-ball": "一个静止小球受到恒力向上推动一段固定时间。画出从释放到落地的速度变化。",
  "physics-past-ice": "冰块浮在一杯水中。冰融化后水面会发生什么？",
  "physics-mock-coffee": "希望十分钟后咖啡最凉，应立即加入冷牛奶，还是饮用前再加？",
  "physics-mock-straw": "普通吸管为什么可用，而十米长的竖直吸管却无法把水吸到嘴里？",
  "eng-past-ruler": "尺子两端附近各放在一根手指上。慢慢把双手靠拢时会发生什么？为什么？",
  "eng-past-dam": "你会如何设计一座依靠自重挡水的重力坝？",
  "eng-mock-elevator": "你会如何为一座一千米高的建筑设计电梯系统？",
  "eng-mock-bridge": "许多人步行通过时，人行桥开始摇摆。你会如何诊断并减小这种运动？",
  "materials-past-balloon": "热气球中的空气需要多热，才能吊起一头大象？",
  "materials-past-diamond": "金刚石和石墨都只由碳构成，为什么前者坚硬而后者柔软？",
  "materials-mock-pan": "不粘锅涂层反复受热后开始剥落。你会如何调查失效原因？",
  "materials-mock-phone": "把手机屏幕做得更硬，是否必然让它更不容易破裂？",
  "chem-past-isomers": "六个碳原子和十二个氢原子可以组成多少种不同分子？",
  "chem-past-glycine": "甘氨酸的分子结构会随 pH 改变吗？",
  "chem-mock-vitamin": "为什么一种维生素易溶于水，而另一种会在体脂中积累？",
  "chem-mock-rate": "温度升高 10°C 后反应速率加倍，是否意味着每个分子的运动速度都加倍？",
  "bio-past-biodiversity": "为什么有些栖息地能支持比其他栖息地更高的生物多样性？",
  "bio-past-stomata": "为什么许多叶片下表面的气孔比上表面更多？",
  "bio-mock-antibiotic": "为什么过早停止抗生素疗程会提高耐药菌变得常见的概率？",
  "bio-mock-photosynthesis": "植物获得两倍光照时，光合作用速率会加倍吗？",
  "med-past-glucose": "为什么尿液中的葡萄糖可以提示一个人可能患有糖尿病？",
  "med-past-mortality": "请按粗死亡率排列孟加拉国、日本、南非和英国。在相信答案前还需要什么信息？",
  "med-mock-screening": "一种新血液检测能很早发现癌症，但会产生许多假阳性。它应否用于人群筛查？",
  "med-mock-oxygen": "病人静息时血氧含量正常，运动时却呼吸困难。可能有哪些机制？",
  "econ-past-holiday": "Alex 每天从支出 x 欧元得到与 √x 成正比的效用，四天预算为 400 欧元。他应如何分配？若 Brian 过度看重今天的消费，会怎样？",
  "econ-past-bankers": "银行家是否配得上他们获得的薪酬？政府是否应当限制？",
  "econ-mock-tickets": "热门演唱会门票数秒售罄，随后以高价转售。原始票价是否过低？",
  "econ-mock-cleaners": "学校只按完成房间数量奖励清洁工，这个指标可能诱发什么行为？",
  "ppe-past-flight": "无论我是否买票，飞机都会起飞，因此我没有不坐飞机的道德理由。这个论证有说服力吗？",
  "ppe-past-blame": "责备一个人究竟包含哪些内容？",
  "ppe-mock-free-speech": "大学是否应保护让许多学生深感冒犯的言论？",
  "ppe-mock-vote": "一张选票几乎永远不会改变选举结果，那为什么还要投票？",
  "law-past-car": "“拿走他人的汽车”究竟意味着什么？",
  "law-past-redlight": "深夜道路空无一人时闯红灯是否仍应违法？",
  "law-mock-height": "消防部门排除所有身高低于 170 厘米的申请者，这条规则公平吗？",
  "law-mock-ai-judge": "法官是否应使用算法预测被告再次犯罪的风险？",
  "english-past-children": "为儿童写作与为成年人写作有哪些不同？",
  "english-past-silence": "我们能听见沉默吗？",
  "english-mock-unreliable": "如果叙述者告诉我们自己不可靠，我们应该相信这句话吗？",
  "english-mock-translation": "翻译作品是否是一部新的文学作品？",
};

export function getQuestionText(question: InterviewQuestion, language: Language) {
  if (language === "en") return question.question;
  return question.questionZh ?? CORE_QUESTION_ZH[question.id] ?? question.question;
}

export function getGuideText(question: InterviewQuestion, language: Language) {
  if (language === "zh") return question.zhGuide;
  return (
    question.guideEn ??
    "Work from " +
      question.anchors.join(", ") +
      ". State assumptions, build the reasoning aloud, and test a limiting case."
  );
}

export function getHints(question: InterviewQuestion, language: Language): [string, string, string] {
  if (language === "zh") return question.hints;
  if (question.hintsEn) return question.hintsEn;
  return [
    "Start from the A-Level ideas of " + question.anchors.slice(0, 2).join(" and ") + ". Define the quantities and fixed conditions.",
    "Turn the situation into a diagram, small example or equation. Explain what each step contributes rather than jumping to a result.",
    "Use " + (question.anchors[2] ?? question.anchors[0]) + " to test a boundary case or alternative explanation, then state a qualified conclusion.",
  ];
}

export function getFollowUp(question: InterviewQuestion, language: Language) {
  return language === "zh" ? question.followUpZh ?? question.followUp : question.followUp;
}

export function getSketchPrompt(question: InterviewQuestion, language: Language) {
  if (language === "zh") {
    return question.sketchPromptZh ?? "画出你用来拆题的图形、坐标轴、受力关系或论证结构。";
  }
  return question.sketchPrompt ?? "Draw the geometry, axes, forces or argument structure that supports your reasoning.";
}
