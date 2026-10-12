/* Case 1: The Keel Hardware Killing — entirely fictional. */
var CASE1 = {
  id: "case1",
  title: "The Keel Hardware Killing",
  town: "Harrow's Ferry",
  premise: "Nov 14, 1998: Martin Keel, 58, owner of Keel & Pratt Hardware in the river town of Harrow's Ferry, was found dead in the back office of his store. The case went cold. Twenty-eight years later the box has landed on your desk.",
  suspects: [
    { id: "laura", name: "Laura Keel", role: "Victim's wife, 54",
      motive: "Beneficiary of a $150,000 life insurance policy; neighbors heard the couple fighting about money.",
      alibi: "Choir practice at First Methodist, 7:00–9:00 PM, then home alone." },
    { id: "owen", name: "Owen Pratt", role: "Business partner, 51",
      motive: "Co-owner of the store. Says the partnership was 'never better.'",
      alibi: "Claims he ate at Dusty's Diner on Route 9 from about 8:00 until 10:30 PM." },
    { id: "ricky", name: "Ricky Dunn", role: "Fired stock clerk, 23",
      motive: "Fired by Keel on Nov 6 for alleged theft; publicly threatened him at the Legion hall.",
      alibi: "Bowling league at Ferry Lanes, 8:30–11:00 PM." },
    { id: "celia", name: "Celia Marsh", role: "Neighbor / landlord of the lot behind the store, 61",
      motive: "Long feud with Keel over a drainage easement; lawsuit pending.",
      alibi: "Home alone watching TV; seen arguing with Keel that afternoon." },
    { id: "tom", name: "Tom Keel", role: "Victim's son, 29",
      motive: "Owed roughly $6,000 in gambling debts; asked his father for money twice that month.",
      alibi: "Drinking at The Anchor tavern, 8:00 PM to closing." }
  ],
  evidence: [
    { id: "E01", type: "Police Report", title: "Incident Report #98-1114", unlock: null,
      html: `<h3>HARROW'S FERRY POLICE DEPT. — INCIDENT REPORT</h3>
<p><b>Case:</b> 98-1114 &nbsp; <b>Date:</b> 11/14/98 &nbsp; <b>Officer:</b> Sgt. D. Whitlow</p>
<p>At 22:52 hrs dispatch received a call from LAURA KEEL reporting her husband had not come home and did not answer the store phone. Officer arrived Keel &amp; Pratt Hardware, 14 Front St., at 23:06. Front door locked. Rear service door UNLOCKED, no sign of forced entry.</p>
<p>Victim MARTIN KEEL located on floor of rear office, unresponsive, head wound. EMS pronounced at 23:21. Cash drawer intact ($312 present). Victim's wallet in pocket. Office desk drawers open; desk ledger book NOT located.</p>
<p>A framing hammer price-tagged from store stock (Aisle 4) is missing from display hook; display box found empty in rear hallway.</p>
<p>Note: Victim's truck parked in rear lot. Light snow began approx 21:30; at 23:06 one set of tire tracks other than victim's visible in rear lot, partially covered.</p>` },
    { id: "E02", type: "Autopsy Summary", title: "Medical Examiner Summary", unlock: null,
      html: `<h3>COUNTY MEDICAL EXAMINER — SUMMARY</h3>
<p><b>Decedent:</b> Keel, Martin A. &nbsp; <b>Age:</b> 58</p>
<p><b>Cause of death:</b> Blunt force injury to the head. <b>Manner:</b> Homicide.</p>
<p>Injury pattern consistent with a hammer-type implement with a round striking face. No defensive wounds; decedent likely did not anticipate the blow, suggesting assailant was known to him or approached without alarm.</p>
<p><b>Estimated time of death:</b> between 21:15 and 22:00 hrs, based on body temperature, lividity and the partially digested meal (consistent with dinner eaten approx. 18:30).</p>
<p>Blood alcohol: 0.00. No other contributing factors.</p>` },
    { id: "E03", type: "Photo Log", title: "Scene Photo Log (Sketch)", unlock: null,
      html: `<h3>SCENE PHOTO LOG — Roll 1 (photos withheld; officer descriptions)</h3>
<svg viewBox="0 0 300 150" class="sketch" role="img" aria-label="sketch of office desk"><rect x="10" y="10" width="280" height="130" fill="none" stroke="#333"/><rect x="40" y="30" width="120" height="50" fill="none" stroke="#333"/><text x="55" y="58" font-size="10">DESK (drawers open)</text><rect x="180" y="30" width="60" height="40" fill="none" stroke="#333"/><text x="186" y="54" font-size="9">FILE CAB.</text><circle cx="120" cy="110" r="4" fill="#333"/><text x="128" y="114" font-size="9">X = victim position</text><rect x="45" y="35" width="25" height="12" fill="none" stroke="#a00" stroke-dasharray="3"/><text x="40" y="95" font-size="8" fill="#a00">dust-free rectangle (ledger?)</text></svg>
<ol><li>#4 — Desk surface. Clean rectangle in dust approx. 9"x12" — something recently removed.</li>
<li>#7 — Two coffee mugs on desk, both half full. One reads "WORLD'S OKAYEST GOLFER."</li>
<li>#9 — Desk calendar, Nov 14: "O. — 9:15 — books" in victim's hand.</li>
<li>#12 — Rear lot. Tire track, wide tread, partially snow-covered.</li>
<li>#15 — Muddy boot print near rear door, partially smeared (see lab note — not processed).</li></ol>` },
    { id: "E04", type: "Interview Transcript", title: "Interview: Owen Pratt", unlock: null,
      html: `<h3>INTERVIEW TRANSCRIPT — OWEN PRATT — 11/15/98 10:40</h3>
<p><b>WHITLOW:</b> Where were you last night?</p>
<p><b>PRATT:</b> Dusty's, out on Route 9. Got there around eight, had the meatloaf, read the paper. I was there till ten-thirty easy. Then straight home.</p>
<p><b>WHITLOW:</b> Anyone see you?</p>
<p><b>PRATT:</b> Waitress, sure. I paid at the counter on my way out, you can check.</p>
<p><b>WHITLOW:</b> How was business between you and Martin?</p>
<p><b>PRATT:</b> Never better. He handled the floor, I handled the books. Nineteen years, no problems.</p>
<p><b>WHITLOW:</b> His calendar says "O, 9:15, books."</p>
<p><b>PRATT:</b> Could be anybody. Could be Ollie from the lumber yard. I didn't have plans with him.</p>` },
    { id: "E05", type: "Interview Transcript", title: "Interview: Laura Keel", unlock: null,
      html: `<h3>INTERVIEW TRANSCRIPT — LAURA KEEL — 11/15/98 09:05</h3>
<p><b>KEEL:</b> Choir ran till nine. I drove home, made tea, and waited. He said he'd be late — he had "a meeting about the books" and he was upset about it.</p>
<p><b>WHITLOW:</b> Upset how?</p>
<p><b>KEEL:</b> He'd been up nights going through the ledgers. He said "the numbers don't add up and I know whose numbers they are." He wouldn't say more.</p>
<p><b>WHITLOW:</b> The insurance policy?</p>
<p><b>KEEL:</b> We took it out in 1990. Everybody has one. Yes, we argued about money. Tom keeps asking for it.</p>
<p><i>Note: Pastor R. Hale confirms Laura Keel present at choir until 21:05; drove away alone.</i></p>` },
    { id: "E06", type: "Witness Statement", title: "Statement: Ricky Dunn", unlock: null,
      html: `<h3>WITNESS STATEMENT — RICHARD "RICKY" DUNN</h3>
<p>I said some things at the Legion, OK? He fired me for stealing and I never took nothing. Ask anybody who was short in that store, it wasn't me — the register was always right when I closed it.</p>
<p>Saturday night I was at Ferry Lanes, league night, from 8:30 till they shut the lanes off at eleven. My team's the Gutter Kings.</p>` },
    { id: "E07", type: "Document", title: "Ferry Lanes League Scoresheet", unlock: null,
      html: `<h3>FERRY LANES — SAT. MIXED LEAGUE — 11/14/98</h3>
<table><tr><th>Team</th><th>Bowler</th><th>G1</th><th>G2</th><th>G3</th></tr>
<tr><td>Gutter Kings</td><td>R. Dunn</td><td>142</td><td>167</td><td>151</td></tr>
<tr><td>Gutter Kings</td><td>M. Ortiz</td><td>133</td><td>120</td><td>148</td></tr>
<tr><td>Pin Pals</td><td>S. Lyle</td><td>180</td><td>171</td><td>199</td></tr></table>
<p>Lane times: G1 start 20:35 · G2 start 21:22 · G3 start 22:08 · lanes closed 22:55.</p>
<p>Desk clerk initials on each game: <i>J.B.</i> — "all bowlers present each game."</p>` },
    { id: "E08", type: "Receipt", title: "Dusty's Diner Receipt", unlock: null,
      html: `<div class="receipt"><h3>DUSTY'S DINER</h3><p>RT 9 · HARROW'S FERRY</p><p>------------------------</p>
<p>TBL 6 &nbsp; SERVER: BEV</p><p>MEATLOAF PLT ....... 5.95</p><p>COFFEE ............. 0.75</p><p>PIE APPLE .......... 1.95</p><p>SUBTOTAL ........... 8.65</p><p>TAX ................ 0.52</p><p>TOTAL .............. 9.17</p><p>CASH ............... 10.00</p><p>------------------------</p>
<p>11/14/98 &nbsp; CLOSED 20:58</p><p>THANK YOU — COME AGAIN</p></div>
<p class="note">Recovered from Owen Pratt's coat pocket, 11/15/98, offered voluntarily as proof of alibi.</p>` },
    { id: "E09", type: "Witness Statement", title: "Statement: Bev Akers (Dusty's)", unlock: null,
      html: `<h3>WITNESS STATEMENT — BEVERLY AKERS, WAITRESS, DUSTY'S DINER</h3>
<p>Mr. Pratt's a regular. Saturday he came in around eight, sat in six like always. Had the meatloaf and pie.</p>
<p>Was he there late? He was there a good while. It got busy after the high school game let out, so I couldn't tell you exactly when he left. His coffee cup was still on the table when I came by, but folks leave cups.</p>
<p>I know the game crowd came in after nine because the radio was doing the post-game.</p>` },
    { id: "E10", type: "Text Messages", title: "Pager Log: Tom Keel", unlock: null,
      html: `<h3>PAGER MESSAGE LOG — SKYTEL ACCT — T. KEEL</h3>
<div class="sms in"><span>19:42</span> CALL ME. U OWE 6K. FRIDAY. -V</div>
<div class="sms in"><span>20:10</span> DONT MAKE ME VISIT THE STORE</div>
<div class="sms out"><span>20:15</span> (callback logged to Anchor Tavern payphone)</div>
<div class="sms in"><span>22:47</span> MOM: WHERE IS YOUR FATHER CALL HOME</div>
<p class="note">Anchor bartender G. Pruitt: "Tom was on that stool from 8 to 1, crying in his beer about money. Never left. Ran a tab." Tab closed 01:12 (attached to file).</p>` },
    { id: "E11", type: "Witness Statement", title: "Statement: Celia Marsh", unlock: null,
      html: `<h3>WITNESS STATEMENT — CELIA MARSH</h3>
<p>Yes, I yelled at him at four o'clock. His gutters dump onto my lot every time it rains and the lawyers are taking forever. I am not sorry.</p>
<p>That night I was home. Around twenty to ten I heard a truck in his back lot — loud, a diesel, like Owen Pratt's Ford. I've heard that engine for nineteen years. I figured Owen was doing his books. Then snow, and I went to bed.</p>
<p>The boot print? I walk my dog back there every night. Of course it's mine.</p>` },
    { id: "E12", type: "Map", title: "Floor Plan & Area Map", unlock: null,
      html: `<h3>KEEL &amp; PRATT HARDWARE — FLOOR PLAN / AREA</h3>
<svg viewBox="0 0 320 220" class="sketch" role="img" aria-label="floor plan"><rect x="10" y="10" width="200" height="140" fill="none" stroke="#222" stroke-width="2"/><text x="80" y="165" font-size="10">FRONT ST. (front door, locked)</text><line x1="10" y1="150" x2="210" y2="150" stroke="#222"/><rect x="20" y="20" width="60" height="50" fill="none" stroke="#222"/><text x="26" y="48" font-size="9">REAR OFFICE</text><text x="40" y="60" font-size="9">✕</text><line x1="20" y1="90" x2="140" y2="90" stroke="#888"/><text x="90" y="86" font-size="8">Aisle 4 (hammers)</text><rect x="20" y="8" width="24" height="5" fill="#a00"/><text x="48" y="7" font-size="8" fill="#a00">rear service door</text><rect x="220" y="10" width="90" height="80" fill="none" stroke="#222" stroke-dasharray="4"/><text x="228" y="50" font-size="9">REAR LOT</text><rect x="220" y="100" width="90" height="50" fill="none" stroke="#222"/><text x="226" y="128" font-size="9">MARSH HOUSE</text><text x="10" y="195" font-size="9">Dusty's Diner: 6 mi via Rt 9 (~10 min drive)</text><text x="10" y="210" font-size="9">Ferry Lanes: 3 mi · The Anchor: 0.5 mi</text></svg>` },
    { id: "E13", type: "Phone Records", title: "Store Phone Records (Subpoena)", unlock: { type: "suspect", n: 1, label: "Mark at least one suspect as SUSPECT on the board to request the subpoena." },
      html: `<h3>BELL ATLANTIC — TOLL/LOCAL DETAIL — 555-0144 (KEEL &amp; PRATT HDWE)</h3>
<table><tr><th>Date</th><th>Time</th><th>Dir</th><th>Number</th><th>Subscriber</th><th>Min</th></tr>
<tr><td>11/14</td><td>17:02</td><td>OUT</td><td>555-0177</td><td>M. Keel (home)</td><td>2</td></tr>
<tr><td>11/14</td><td>17:40</td><td>OUT</td><td>555-0391</td><td>H. Monroe CPA</td><td>6</td></tr>
<tr><td>11/14</td><td>18:05</td><td>OUT</td><td>555-0218</td><td>O. Pratt (home)</td><td>3</td></tr>
<tr><td>11/14</td><td>21:02</td><td>IN</td><td>555-0402</td><td>Payphone, Dusty's Diner</td><td>1</td></tr>
<tr><td>11/14</td><td>22:31</td><td>IN</td><td>555-0177</td><td>M. Keel (home)</td><td>0 (no ans.)</td></tr>
<tr><td>11/14</td><td>22:49</td><td>IN</td><td>555-0177</td><td>M. Keel (home)</td><td>0 (no ans.)</td></tr></table>` },
    { id: "E14", type: "Handwritten Note", title: "Note Found in Victim's Truck", unlock: { type: "reviewed", ids: ["E02","E03"], label: "Review the autopsy and the scene photo log, then search the victim's truck." },
      html: `<div class="handwritten"><p>Hal —</p><p>RQH SUDWW</p><p>41,200 since '95. Three sets of books.</p><p>Meet him tonight. If he won't make it right, you take it to the D.A. Monday.</p><p>— M.</p></div>
<p class="note">Found folded in truck visor. Lab: victim's handwriting. Second line appears to be a simple letter-shift code — Martin did crossword ciphers for the Ferry Gazette (shift of three).</p>` },
    { id: "E15", type: "Financial Record", title: "Accountant's Letter (H. Monroe CPA)", unlock: { type: "count", n: 8, label: "Review 8 evidence items to locate Martin's accountant." },
      html: `<h3>HAROLD MONROE, CPA — LETTER TO DET. WHITLOW — 11/18/98</h3>
<p>Martin called me the afternoon he died (approx. 5:40 PM). He'd compared the bank deposits to the store ledger he kept in his desk. About $41,000 over three years had been moved to a supplier account, "Rivermill Supply," that does not exist. Only the partner who handles the books could have done that.</p>
<p>He told me he'd confront Owen that night and give him a chance to repay it before going to the authorities. I advised him not to meet alone. The desk ledger was the only complete copy.</p>` },
    { id: "E16", type: "Lab Report", title: "Vehicle & Trace Report", unlock: { type: "count", n: 11, label: "Review 11 evidence items to receive the late lab report." },
      html: `<h3>STATE CRIME LAB — SUPPLEMENTAL (1999, filed late)</h3>
<p>Tire impression #12 (rear lot): wide all-terrain tread consistent with Goodyear Wrangler LT 235/85R16. Vehicles registered in town with this size include: Ford F-250 (O. Pratt), Ford F-250 (Ferry Lumber Co.), Chevrolet K2500 (R. Dunn's father).</p>
<p>Boot print #15: consistent with women's size 8 rubber boot. Celia Marsh owns matching boots; she walks a dog nightly. Not probative.</p>
<p>Mugs #7: latent prints on "WORLD'S OKAYEST GOLFER" mug — insufficient ridge detail. <i>Note: O. Pratt is listed as Keel's partner in the 1997 Ferry Golf Club scramble.</i></p>` }
  ],
  timelineEvents: [
    { id: "t1", text: "Keel argues with Celia Marsh about drainage (4:00 PM)" },
    { id: "t2", text: "Keel calls accountant Harold Monroe (5:40 PM)" },
    { id: "t3", text: "Keel calls Owen Pratt at home (6:05 PM)" },
    { id: "t4", text: "Pratt's diner check is closed and paid (8:58 PM)" },
    { id: "t5", text: "Call from Dusty's payphone to the store (9:02 PM)" },
    { id: "t6", text: "Calendar meeting: 'O. — 9:15 — books'" },
    { id: "t7", text: "Snow begins (~9:30 PM)" },
    { id: "t8", text: "Marsh hears a diesel truck in the rear lot (~9:40 PM)" },
    { id: "t9", text: "Laura calls the store, no answer (10:31 PM)" },
    { id: "t10", text: "Body discovered by police (11:06 PM)" }
  ],
  motives: [
    { id: "insurance", label: "Life insurance payout" },
    { id: "embezzle", label: "Cover up embezzlement from the store" },
    { id: "revenge", label: "Revenge for being fired" },
    { id: "debt", label: "Gambling debt / needed money" },
    { id: "feud", label: "Property feud" }
  ],
  solution: {
    killer: "owen", motive: "embezzle", keyEvidence: ["E08"],
    acceptableKey: ["E08", "E04"],
    debrief: [
      "Owen Pratt told police he was at Dusty's Diner until 10:30 PM and 'paid at the counter on my way out' (Interview, E04).",
      "But his own receipt shows the check was CLOSED at 8:58 PM (E08). Bev the waitress can't say when he left — only that a cup sat on the table (E09). The alibi collapses when the receipt and interview are compared.",
      "At 9:02 PM someone called the store from Dusty's payphone (E13) — Owen confirming the 9:15 'books' meeting on Martin's calendar (E03). Dusty's is ~10 minutes away (E12).",
      "Celia Marsh heard Owen's distinctive diesel in the rear lot around 9:40 (E11), inside the 9:15–10:00 time of death (E02). The tread matches his F-250 (E16). No forced entry and no defensive wounds: Martin let in someone he knew.",
      "Motive: Martin had found ~$41,200 moved to a fake supplier — 'ONE PRATT' in his shift-3 cipher (E14) — and told his accountant he'd confront Owen that night (E15). The only full copy, the desk ledger, vanished from the desk (E01, E03).",
      "Red herrings: Ricky Dunn's threats (cleared by the bowling scoresheet, E07), Laura's insurance policy (choir until 9:05, but no link to the books meeting), Tom's debt (bartender + tab place him at The Anchor all night), and Celia's feud and boot print (her nightly dog walk)."
    ],
    wrongHints: {
      laura: "Laura's policy is old news. Who was Martin meeting at 9:15, and what were they meeting about?",
      ricky: "Check whether Ricky's league night actually leaves a gap around the time of death.",
      celia: "Celia's anger is real, but she's also your best ear-witness. Listen to what she heard.",
      tom: "Tom's debt is a motive, but a bartender and a tab put him on a stool all night.",
      owen_motive: "You have the right person. Re-read what Martin was doing with the ledgers.",
      owen_key: "You have the right person and reason. Which single document breaks his alibi when held against his own words?"
    }
  },
  hints: [
    "Hint 1: Every suspect gave an alibi with a time. Look for one that a printed document can check to the minute.",
    "Hint 2: Lay the Dusty's paperwork next to the interview in which someone says where they paid.",
    "Hint 3: Martin wrote a meeting on his calendar and a note in his truck. Decode the note (shift each letter back three) and ask who handled the books."
  ]
};
if (typeof module !== "undefined") module.exports = CASE1;
