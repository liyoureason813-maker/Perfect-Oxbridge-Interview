import type { DiagramKind } from "./question-bank";
import type { Language } from "./question-locales";

interface ModelDiagramProps {
  kind: DiagramKind;
  language: Language;
}

const navy = "#102b3f";
const wine = "#7a3041";
const brass = "#a37b3d";
const grid = "#d8d0c1";

function Axes() {
  return (
    <>
      <path d="M85 245H650M100 265V35" stroke={navy} strokeWidth="3" fill="none" />
      <path d="m650 245-12-7v14zM100 35l-7 12h14z" fill={navy} />
    </>
  );
}

export default function ModelDiagram({ kind, language }: ModelDiagramProps) {
  const zh = language === "zh";
  let graphic;
  let caption = zh ? "示意图用于展示推理结构，比例不一定精确。" : "The diagram shows the reasoning structure and is not necessarily to scale.";

  if (kind === "circle-rectangle") {
    graphic = (
      <>
        <circle cx="355" cy="150" r="112" fill="none" stroke={navy} strokeWidth="4" />
        <rect x="276" y="71" width="158" height="158" fill="#7a304112" stroke={wine} strokeWidth="4" />
        <path d="M355 150L434 71M355 150H434M434 150V71" fill="none" stroke={brass} strokeWidth="3" />
        <text x="398" y="164">x</text><text x="442" y="114">y</text><text x="390" y="105">r</text>
      </>
    );
    caption = zh ? "顶点 (x,y) 满足 x²+y²=r²；当 x=y 时矩形成为最大面积正方形。" : "The vertex (x,y) satisfies x²+y²=r²; equality x=y gives the maximum-area square.";
  } else if (kind === "velocity-time") {
    graphic = (
      <>
        <Axes />
        <path d="M100 245C155 145 250 92 430 78C505 72 570 71 635 71" fill="none" stroke={wine} strokeWidth="6" />
        <path d="M100 65C185 95 272 150 390 201C470 235 550 242 635 244" fill="none" stroke={brass} strokeWidth="5" strokeDasharray="12 9" />
        <text x="575" y="60">v(t)</text><text x="575" y="225">a(t)</text><text x="612" y="266">t</text>
      </>
    );
    caption = zh ? "速度上升但斜率持续减小；加速度由 g 渐近降至 0。" : "Velocity rises with a diminishing gradient while acceleration falls asymptotically from g to zero.";
  } else if (kind === "forces") {
    graphic = (
      <>
        <circle cx="355" cy="150" r="48" fill="#f4ecdf" stroke={navy} strokeWidth="4" />
        <path d="M355 102V38M355 198V262M307 150H220M403 150H490" stroke={wine} strokeWidth="5" />
        <path d="m355 38-9 16h18zM355 262l-9-16h18zM220 150l16-9v18zM490 150l-16-9v18z" fill={wine} />
        <text x="370" y="54">F₁</text><text x="370" y="254">mg</text><text x="235" y="139">drag</text><text x="430" y="139">motion</text>
      </>
    );
    caption = zh ? "先声明方向，再画出所有外力；箭头长度用于比较相对大小。" : "Choose a direction first, then include every external force; arrow lengths compare relative magnitude.";
  } else if (kind === "beam") {
    graphic = (
      <>
        <rect x="130" y="132" width="470" height="52" fill="#a37b3d25" stroke={navy} strokeWidth="4" />
        <path d="M150 115V55M250 115V75M350 115V55M450 115V75M550 115V55" stroke={wine} strokeWidth="4" />
        <path d="m150 115-8-14h16zM250 115l-8-14h16zM350 115l-8-14h16zM450 115l-8-14h16zM550 115l-8-14h16z" fill={wine} />
        <path d="M130 158H600" stroke={brass} strokeWidth="3" strokeDasharray="12 8" />
        <path d="M150 216C250 245 470 245 580 202" fill="none" stroke={wine} strokeWidth="5" />
        <text x="610" y="163">neutral axis</text><text x="315" y="271">deflection / stress trend</text>
      </>
    );
    caption = zh ? "载荷、支承、中性轴与挠曲趋势应在同一张图中保持一致。" : "Loads, supports, the neutral axis and the deflected shape should be mutually consistent.";
  } else if (kind === "energy-profile") {
    graphic = (
      <>
        <Axes />
        <path d="M110 208C210 205 215 53 330 52C430 52 430 180 620 178" fill="none" stroke={wine} strokeWidth="5" />
        <path d="M110 208C200 205 220 112 310 110C420 108 445 180 620 178" fill="none" stroke={brass} strokeWidth="5" strokeDasharray="12 8" />
        <path d="M118 208V178M610 178V208" stroke={grid} strokeWidth="3" />
        <text x="255" y="39">uncatalysed</text><text x="310" y="102">catalysed</text><text x="500" y="168">products</text>
      </>
    );
    caption = zh ? "催化路径降低活化能，但反应物、生成物能级与总焓变不变。" : "The catalyst lowers the activation barrier without changing reactant or product energy levels.";
  } else if (kind === "titration") {
    graphic = (
      <>
        <Axes />
        <path d="M105 220C220 214 305 197 360 170C395 151 398 75 425 62C470 42 555 40 635 39" fill="none" stroke={wine} strokeWidth="6" />
        <path d="M365 245V55" stroke={brass} strokeWidth="3" strokeDasharray="9 8" />
        <circle cx="278" cy="192" r="7" fill={brass} /><text x="235" y="181">½ eq.</text><text x="372" y="265">equivalence</text>
      </>
    );
    caption = zh ? "标出缓冲区、半当量点和高于 pH 7 的当量点，并解释每段由什么物种控制。" : "Label the buffer, half-equivalence and above-7 equivalence regions and explain which species controls each.";
  } else if (kind === "logistic") {
    graphic = (
      <>
        <Axes />
        <path d="M105 235C170 230 245 218 315 174C385 130 430 76 625 70" fill="none" stroke={wine} strokeWidth="6" />
        <path d="M105 235C260 222 410 180 610 40" fill="none" stroke={brass} strokeWidth="4" strokeDasharray="11 8" />
        <path d="M100 70H640" stroke={grid} strokeWidth="3" strokeDasharray="8 8" />
        <text x="610" y="61">K</text><text x="480" y="119">logistic</text><text x="510" y="49">exponential</text>
      </>
    );
    caption = zh ? "密度制约使种群在环境容纳量 K 附近趋于平稳，而非无限指数增长。" : "Density dependence makes population approach carrying capacity K rather than grow exponentially forever.";
  } else if (kind === "supply-demand") {
    graphic = (
      <>
        <Axes />
        <path d="M145 220L575 62" stroke={navy} strokeWidth="5" />
        <path d="M145 60L575 220" stroke={wine} strokeWidth="5" />
        <path d="M160 183L590 25" stroke={brass} strokeWidth="5" strokeDasharray="10 7" />
        <path d="M338 133V245M100 133H338" stroke={grid} strokeWidth="3" strokeDasharray="8 7" />
        <text x="565" y="55">S</text><text x="570" y="238">D</text><text x="585" y="35">S+tax</text>
      </>
    );
    caption = zh ? "税收造成买方价格与卖方净价之间的楔子，并减少均衡交易量。" : "The tax creates a wedge between buyer and seller prices and reduces equilibrium quantity.";
  } else if (kind === "argument-map") {
    graphic = (
      <>
        <rect x="280" y="118" width="170" height="64" rx="8" fill="#7a304118" stroke={wine} strokeWidth="4" />
        <rect x="60" y="40" width="150" height="52" rx="8" fill="#fffdf8" stroke={navy} strokeWidth="3" />
        <rect x="510" y="40" width="150" height="52" rx="8" fill="#fffdf8" stroke={navy} strokeWidth="3" />
        <rect x="60" y="218" width="150" height="52" rx="8" fill="#fffdf8" stroke={brass} strokeWidth="3" />
        <rect x="510" y="218" width="150" height="52" rx="8" fill="#fffdf8" stroke={brass} strokeWidth="3" />
        <path d="M210 66L280 130M510 66L450 130M210 244L280 172M510 244L450 172" stroke={navy} strokeWidth="3" />
        <text x="305" y="157">{zh ? "暂定结论" : "Provisional claim"}</text>
        <text x="92" y="71">{zh ? "前提" : "Premise"}</text><text x="542" y="71">{zh ? "证据" : "Evidence"}</text>
        <text x="89" y="249">{zh ? "反例" : "Countercase"}</text><text x="540" y="249">{zh ? "边界" : "Boundary"}</text>
      </>
    );
    caption = zh ? "把前提、证据、反例和边界条件连接到一个可修正的暂定结论。" : "Connect premises, evidence, countercases and boundaries to a revisable provisional claim.";
  } else if (kind === "balance") {
    graphic = (
      <>
        <path d="M355 55V225M245 225H465M215 105H495" stroke={navy} strokeWidth="5" />
        <path d="M245 105L190 190H300zM465 105L410 190H520z" fill="#a37b3d25" stroke={brass} strokeWidth="4" />
        <circle cx="355" cy="90" r="16" fill={wine} />
        <text x="205" y="215">{zh ? "原则 A" : "Principle A"}</text><text x="430" y="215">{zh ? "原则 B" : "Principle B"}</text>
      </>
    );
    caption = zh ? "不要只列观点；说明两个原则何时冲突、各自适用边界以及你的权衡规则。" : "Do more than list views: explain when principles conflict, their limits and the rule used to balance them.";
  } else if (kind === "text-structure") {
    graphic = (
      <>
        <path d="M90 72H630M90 124H540M90 176H610M90 228H500" stroke={grid} strokeWidth="17" strokeLinecap="round" />
        <path d="M145 55V245M330 55V245M505 55V245" stroke={brass} strokeWidth="3" strokeDasharray="8 8" />
        <circle cx="145" cy="72" r="10" fill={wine} /><circle cx="330" cy="176" r="10" fill={wine} /><circle cx="505" cy="124" r="10" fill={wine} />
        <path d="M145 92C190 130 275 150 330 166M340 166C400 145 450 128 495 124" fill="none" stroke={wine} strokeWidth="4" />
        <text x="112" y="274">{zh ? "转折" : "shift"}</text><text x="300" y="274">{zh ? "重复" : "pattern"}</text><text x="480" y="274">{zh ? "重构" : "reframe"}</text>
      </>
    );
    caption = zh ? "把文本中的转折、重复与重新定向画成结构图，再用具体措辞验证解释。" : "Map shifts, repetitions and reframing, then test the interpretation against exact wording.";
  } else {
    graphic = (
      <>
        <Axes />
        <path d="M105 228C180 225 220 190 275 170C330 150 360 80 430 78C510 75 555 110 635 42" fill="none" stroke={wine} strokeWidth="6" />
        <circle cx="275" cy="170" r="7" fill={brass} /><circle cx="430" cy="78" r="7" fill={brass} />
        <path d="M275 170V245M430 78V245" stroke={grid} strokeWidth="3" strokeDasharray="8 8" />
      </>
    );
    caption = zh ? "先标出截距、驻点、渐近行为和定义域，再用导数或约束检验图形。" : "Mark intercepts, stationary points, asymptotic behaviour and domain, then verify the sketch analytically.";
  }

  return (
    <figure className="model-diagram">
      <div className="diagram-heading">
        <span>{zh ? "可视化解析" : "Visual explanation"}</span>
        <strong>{zh ? "把推理画出来" : "Make the reasoning visible"}</strong>
      </div>
      <svg viewBox="0 0 720 300" role="img" aria-label={caption}>
        {graphic}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
