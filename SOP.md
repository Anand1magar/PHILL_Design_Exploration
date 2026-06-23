# Standard Operating Procedure

## Start PA — Prior Authorization Workflow

**Phil Pharmacy Platform · Pharmacy Benefits Team**

| | |
|---|---|
| **Purpose** | Initiate and submit Prior Authorization requests |
| **Applies To** | All Pharmacy Benefit Reviewers |
| **Version** | 2.0 |
| **Effective Date** | June 2026 |

---

## Overview

When a pharmacy processes a prescription and the insurance returns a rejection, the claim is routed to the PA (Prior Authorization) Queue with the status **Start PA**. A PA Specialist opens the order, reviews all available patient, insurance, prescriber, and medication information, and initiates a PA request through the appropriate channel (CoverMyMeds, Verbal, or Web Link). Once submitted, a fax is sent to the prescriber via Phil's fax system and the action is logged in the PA Queue comments history trail.

> **Agent behavior note:**
> This SOP is the authoritative knowledge source for the Phil PA Workflow AI Agent. The agent uses this document to: (1) answer specialist questions, (2) guide users step by step through each decision point, (3) populate CMM form fields from pasted Ops Dash data, and (4) trigger the fax send flow and log completion in the PA Queue history trail.

---

## Resources

- **CoverMyMeds (CMM)** — primary PA submission portal
- **Ops Dash** — Phil operations dashboard; source of order data
- **BestRx** — pharmacy management system; source of Rx and insurance data
- **CMM Reference Guide** — messaging and troubleshooting for CMM responses
- **Rejection Cheatsheet (PA Team tab)** — valid rejection codes requiring PA
- **Non-CMM PA Reference** — for verbal and web link PA types
- **BestRx Workflow** — step-by-step for BestRx insurance and PA request actions
- **2026 New Year Guidelines** — annual coverage and limit updates
- **SOP: PA Summary Download & Upload**

---

## Trigger Conditions — When This SOP Applies

This SOP is triggered when **ALL** of the following are true:

- The pharmacy processor (PP) returns a rejection with a PA-required code (most commonly **Code 75: Prior Authorization Required**).
- The order appears in the PA Queue with status **Start PA**.
- A PA Specialist opens the order and confirms the rejection is valid per the Rejection Cheatsheet (PA Team tab).

> ⚠️ If the rejection code is **NOT** on the PA Team tab of the Rejection Cheatsheet, do **NOT** proceed. Escalate to a Team Lead or Supervisor immediately.

---

## Phil UI Layout — Start PA Screen

When a specialist opens a Start PA order, the screen contains:

### Left panel — order information

- Patient name, date of birth, order number, PhilRx pharmacy location (Arizona or Ohio)
- **Claim rejected** section: rejection code and pharmacy name
- **Previous Prior Authorizations:** any prior CMM determinations on file (may be from a different insurance plan)
- **Patient Profile:** legal name, allergies, DOB, address
- **Insurance Details:** primary carrier, member ID, group, BIN, PCN, type
- **Doctor Information:** full name, NPI, practice name, contact; NPI verified badge
- **Medication Information:** drug name, Rx#, NDC, quantity, day supply, refills, package size, ICD-10, DAW code, SIG, manufacturer
- **MD Notes:** tried-and-failed medications, MD progress notes

### Right panel — PA form

- Select Insurance Provider dropdown
- Prior Authorization Type dropdown: CoverMyMeds, Verbal, or Web Link
- Conditional fields based on PA type selected (see Step 9)
- Start Prior Authorization button (disabled until required fields are filled)
- Already Submitted in CoverMyMeds link

### Right sidebar — PA Queue

- PA Best Practice (SOP) reference link
- Comments box for free-text notes
- History trail: timestamped system and agent log entries for every action taken on the order

---

## Pre-PA Checklist — Must Complete Before Starting

> 🛑 **STOP:** Do not start PA unless **ALL 5** items below are confirmed.
> If any item cannot be confirmed, do not proceed. Resolve the issue or escalate.

1. Valid rejection code that requires a PA (per Rejection Cheatsheet, PA Team tab).
2. No active or valid PA already on file within manufacturer limits.
3. No approval or denial already exists for the current year (within manufacturer limits).
4. No alternative resolution available (e.g., rerun, eligibility fix, reroute to contracted PP).
5. Insurance is verified and confirmed on the order in both Ops Dash and BestRx.

---

## Process Steps

### Step 1 — Verify the Rejection Reason from the PP

When the order lands in Start PA, the first action is to confirm the rejection is legitimate and actionable.

- Open the order in Phil and review the **Claim Rejected** section.
- Note the rejection code and pharmacy name.
- Cross-reference the code against the Rejection Cheatsheet (PA Team tab).

**Rejection is valid — PA required**

- Code is on the PA Team tab.
- Proceed to Step 2.

**Rejection is NOT valid**

- Escalate to Team Lead or Supervisor.
- Do not proceed with PA.

> **Non-contracted PP:** If the rejection is due to a non-contracted pharmacy processor, request a rerun. Add the comment: *"Reroute to contracted PP."* Do not start PA.
>
> **No contracted PPs available:** Review manufacturer rules. Determine whether a PA is actually required before proceeding.

### Step 2 — Search for Existing PA Determination in CMM

Before creating a new PA, always check whether a valid prior determination already exists in CoverMyMeds.

- Copy the patient's full name from the order.
- Paste the name into CoverMyMeds and search.
- Review any previous PA determinations listed.

**Determination found**

- Confirm it is still valid: match the insurance plan, member ID, DOB, and medication name.
- CMM keys marked **Denied** on the CMM Dash are acceptable denials for all medications unless the insurance plan has changed.
- If PA status is already correct in Ops Dash: select **Request Rerun**. Card complete.
- If PA status is incorrect in Ops Dash: update **PA Results** in the first workflow step. Card complete.
- If PP reports a valid rejection after PA is marked Approved: call the plan to confirm. If valid, select **Request Rerun**. If no valid approval on file, proceed to Step 3.

**No determination found (or new one needed)**

- Copy the PhilRx number from Ops Dash.
- Paste into BestRx.
- Proceed to Step 3.
- If the CMM key was archived by MDO before submission without a determination: call the plan for PA determination.
- If the PA request was archived by MDO: review the documented reason. If no reason provided, mark as **Stopped**.

### Step 3 — Search for Existing PA Determination in BestRx

Review BestRx for any determination that was received outside of CMM — including faxes and hardcopy notations.

- Review the prescription hardcopy, Patient Documents, and RX Processing Documents in BestRx.
- Look for any determination fax using the BestRx Workflow reference.

> **Special medication rule — Tyrvaya, Winlevi, Cequa, and Auvelity:**
> These four medications require **proof of denial**. Acceptable denial evidence must include **ALL** of the following:
> - CMM key OR CMM message marked denied by MDO, **AND**
> - Reference or case number, **AND**
> - Denial letter including the patient's name and member ID, within the calendar year.
>
> A hardcopy notation alone is **NOT** sufficient for these medications.

**Determination found in BestRx**

- Approval on hardcopy + valid PP rejection: call insurance to confirm approval is valid.
- Approval on hardcopy + no contracted PP: no call required.
- Denial on hardcopy: accept the denial and mark PA as **Denied** (except for Tyrvaya, Winlevi, Cequa, Auvelity — see above).
- Confirm insurance plan and member ID match.
- Update PA status or Request Rerun. Card complete.

**No determination found in BestRx**

- Confirm insurance in BestRx matches Ops Dash.
- If insurance does not match: add insurance to BestRx using Step 7 of the BestRx Workflow.
- Click **PA Request → Send Via CoverMyMeds**.
- If an error message appears: click **Send Manual Fax** and send a manual request in CMM.
- Proceed to Step 4.

### Step 4 — Search for the Patient in CMM

Open CoverMyMeds and locate the patient record to begin the PA form.

- Search for the patient by name in CMM.
- If the search takes longer than 1 minute: move to the next card in the queue and return once CMM has loaded.

### Step 5 — Pre-PA Checklist — Final Confirmation

Before proceeding to fill the PA form, the PA Specialist must confirm all 5 checklist items (see Pre-PA Checklist section above).

- If **ANY** of the 5 items cannot be confirmed — stop. Do not start PA.
- All 5 confirmed? Proceed to Step 6.

### Step 6 — Complete the PA Form in CMM

Fill the CoverMyMeds form carefully and completely. Every field matters — do not skip fields that are not marked required.

**Fields to complete**

| Field | Details / Source |
|---|---|
| Patient name | Legal name — must match insurance records exactly |
| Date of birth | From patient profile |
| Address | Current address from patient profile |
| Allergies | From patient profile |
| Insurance carrier | Must match insurance currently on the order |
| Member ID | From insurance details panel |
| BIN / PCN / Group | From insurance details panel |
| Prescriber name | Full name from Doctor Information panel |
| Prescriber NPI | Verified NPI from Doctor Information panel |
| Practice name | From Doctor Information panel |
| Prescriber contact | Phone and fax from Doctor Information panel |
| Drug name + strength | From Medication Information panel |
| Rx number | From Medication Information panel |
| NDC | From Medication Information panel |
| Quantity | From Medication Information panel |
| Day supply | From Medication Information panel |
| Drug form | From Medication Information panel |
| DAW code | From Medication Information panel |
| Dosing schedule (SIG) | From Medication Information panel |
| ICD-10 code(s) | From Medication Information panel |
| Tried & failed medications | From MD Notes panel (if available) |

**Date of service — conditional rule**

- **ePAs:** If clinical questions can be generated (enough info is available): add the date of service before clicking **Send To Plan**.
- **ePAs:** If clinical questions cannot be generated: do **NOT** add the date of service.
- **Non-ePAs:** Never add the date of service.

**Eligibility passes**

- Proceed to Step 7.

**Eligibility fails**

- Troubleshoot before proceeding.
- Use the Troubleshooting Tips tab in the CMM Reference Guide.
- Do not proceed until eligibility is resolved.

### Step 7 — Submit to Plan (ePA Forms Only)

For electronic PA forms, submit directly to the insurance plan through CMM.

- Click **Send to Plan**.
- Wait approximately 2 minutes for clinical questions to populate.

**Clinical questions populate within 2 minutes**

- Proceed to Step 8 and answer all clinical questions.

**Clinical questions take more than 2 minutes**

- In the last step of the workflow, select **YES** to the prompt: *"Are clinical questions still pending from the plan?"*
- Do not wait indefinitely — proceed and flag as pending.

> If unable to send to plan: **save the form. Do not abandon it.**
>
> If a message is returned from the plan: look up the message in the CMM Reference Guide for the appropriate next step. Do not guess — follow the reference guide instructions for that specific message.

### Step 8 — Complete Clinical Questions

Answer all clinical questions that have been populated by the plan.

- Read each question carefully.
- Answer all questions where applicable — do not skip questions.
- Click **Save**.

### Step 9 — Select PA Type and Complete Phil Form

Return to the Phil Start PA screen. In the right panel, select the **Insurance Provider** and then the **PA Authorization Type**. Each PA type requires different information:

**PA type: CoverMyMeds (most common)**

| Field | Details / Source |
|---|---|
| CMM key | Copy from CoverMyMeds after completing the PA form. Paste into the CMM Key field in Phil. |
| Clinical questions generated? | Select **Yes** if clinical questions were presented during the CMM session. Select **No** if no clinical questions appeared. |
| Renewal PA submittable early? | Select **Yes** if the renewal PA can be submitted to the plan prior to the current PA expiration. Select **No** otherwise. |

**PA type: Verbal**

The specialist calls the insurance plan directly to submit the PA verbally.

| Field | Details / Source |
|---|---|
| Doctor phone number | Enter the prescriber's phone number (from Doctor Information panel). This is the number used to contact the plan or the prescriber during the verbal PA call. |

**PA type: Web link**

The specialist submits the PA through the insurance plan's own web portal.

| Field | Details / Source |
|---|---|
| Insurance web link | Enter the full URL of the plan's PA submission portal. Retrieved from the Non-CMM PA reference or the plan's documentation. |

### Step 10 — Update the Phil Dashboard

After completing the CMM form and obtaining the CMM key:

- Copy the **CMM Key** from CoverMyMeds.
- Paste it into the **CMM Key** field in the Phil Ops Dashboard.
- This links the CMM submission to the Phil order record.

### Step 11 — Start Prior Authorization — Send Fax to Doctor

The final action is to send the PA fax to the prescriber so they can complete their portion.

- Review all fields in the Phil PA form one final time.
- Confirm the insurance, PA type, patient, and prescriber fields are correct and complete.
- Click **Start Prior Authorization**.

**What happens when Start Prior Authorization is clicked:**

1. Phil's fax system sends the PA fax to the prescribing doctor.
2. The action is automatically logged as a timestamped entry in the PA Queue comments / history trail.
3. The card is marked complete.

The history trail entry will include: fax sent confirmation, PA type, CMM key (if applicable), insurance, patient, and medication details.

---

## Quick Decision Reference

| Situation | Action | Outcome |
|---|---|---|
| Non-contracted PP | Request rerun + comment: "Reroute to contracted PP" | Card routed; no PA started |
| No contracted PPs available | Review manufacturer rules | Determine if PA is needed |
| Valid CMM determination exists + PA status correct | Request Rerun | Card complete |
| Valid CMM determination exists + PA status wrong | Update PA Results | Card complete |
| CMM key archived by MDO, no determination | Call plan for determination | Proceed based on outcome |
| No CMM or BestRx determination found | Send Via CoverMyMeds (or manual fax) | Proceed to Steps 4–11 |
| Eligibility fails in CMM | Troubleshoot with payer | Do not proceed until resolved |
| Clinical questions pending > 2 min | Flag as pending in last workflow step | Continue; questions resolved later |
| Tyrvaya / Winlevi / Cequa / Auvelity denial | Require full proof of denial (CMM key + ref # + denial letter) | Do not accept hardcopy alone |

---

## AI Agent Behavior Guide

The Phil PA Workflow AI Agent uses this SOP to support specialists in real time. Below is how the agent should interpret and apply each part of the workflow.

### Form population

- When the specialist pastes raw order data from Ops Dash, the agent extracts and populates all CMM form fields automatically.
- Populated fields should be visually flagged for review — the specialist is responsible for confirming accuracy before submitting.
- If a field cannot be extracted, it must be left blank for the specialist to fill manually.

### PA type conditional logic

- **CoverMyMeds selected:** show CMM Key field + clinical questions prompt + renewal PA prompt.
- **Verbal selected:** show Doctor Phone Number field. The specialist will call the plan.
- **Web Link selected:** show Insurance Web Link field. The specialist will submit via the plan's portal.

### Fax trigger and history trail

- When Start Prior Authorization is clicked, the agent triggers Phil's fax system to send the PA to the doctor.
- The agent immediately logs the following entries to the PA Queue history trail:
  - "Start PA completed by agent. Order put to sleep for 30 mins."
  - "Fax sent to [prescriber name] via Phil fax system for PA completion."
  - "PA created via [PA type]. CMM Key: [key] (if applicable)."
  - "Insurance verified: [carrier] · Member ID: [member ID]."
  - "Medication: [drug name]. Order: [order number]."
- All entries are timestamped and attributed to **PhilSystem**.

### Q&A responses

- The agent answers workflow questions using this SOP as the single source of truth.
- Answers should be 2–4 sentences, direct, and actionable.
- If the answer is not in this SOP, the agent should escalate: *"Please refer to a Team Lead or Supervisor for guidance on this."*
- The agent should never guess or invent policy.

### Checklist enforcement

- The agent presents the Pre-PA Checklist before allowing the specialist to proceed to form completion.
- If any of the 5 items are not confirmed, the Start Prior Authorization button remains disabled.
- The agent displays a clear warning: *"Do not start PA until all 5 items are confirmed."*

---

## Escalation Triggers

Escalate to a Team Lead or Supervisor when:

- The rejection code is not on the PA Team tab of the Rejection Cheatsheet.
- There is no contracted PP and manufacturer rules are unclear.
- A CMM key was archived by MDO with no documented reason.
- The insurance plan cannot confirm whether an existing approval is valid.
- Eligibility fails and cannot be resolved through standard troubleshooting.
- A CMM message is returned that is not covered in the CMM Reference Guide.
- The PA request was archived by MDO with no documented reason.

---

## Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | April 22, 2026 | Pharmacy Benefits Team | Initial release |
| 2.0 | June 2026 | Phil AI Team | Expanded with AI agent behavior guide; added PA type conditional fields (Verbal: doctor phone, Web Link: URL); updated fax trigger and history trail logic; added full field reference table; aligned with v2 Phil UI screens. |

---

*END OF DOCUMENT — Phil Pharmacy Platform · Start PA SOP v2.0*
