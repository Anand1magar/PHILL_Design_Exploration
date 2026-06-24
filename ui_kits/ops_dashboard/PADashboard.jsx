import React, { useState } from 'react';
import philLogoRaw from '../../assets/phil Logo.svg?raw';
import paQueueIconRaw from '../../assets/Icons/PA_Queue_Icon.svg?raw';
import { AppHeader }  from '../../components/navigation/AppHeader.jsx';
import { Card }       from '../../components/layout/Card.jsx';
import { KeyValue }   from '../../components/layout/KeyValue.jsx';
import { Tag }        from '../../components/core/Tag.jsx';
import { StatusPill } from '../../components/core/StatusPill.jsx';
import { Button }     from '../../components/core/Button.jsx';
import { Icon }       from '../../components/core/Icon.jsx';
import { Alert }      from '../../components/feedback/Alert.jsx';
import { ProgressBar } from '../../components/feedback/ProgressBar.jsx';
import { CommentBox, CommentItem } from '../../components/feedback/CommentBox.jsx';
import { Select }     from '../../components/forms/Select.jsx';

const PALETTE = {
  appBg: 'var(--color-app-bg)',
  ink: 'var(--color-text-default)',
  sub: 'var(--color-text-secondary)',
};

// ── Hero: Start PA panel ──────────────────────────────────────────
function HeroPanel({ status, onStart }) {
  const [provider, setProvider] = useState('United Healthcare CM');
  const [paType, setPaType] = useState('');
  const ready = provider && paType && status === 'none';

  return (
    <Card padding={0} style={{ overflow: 'hidden' }} bodyStyle={{ gap: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', alignItems: 'stretch' }}>
        {/* Left: patient identity + claim + previous PA */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Tag color="blue" icon={<Icon name="shield-check" size={11} />}>START PA</Tag>
          <div>
            <h2 style={{ margin: 0, font: '900 36px/40px var(--font-body)', color: 'var(--color-brand)' }}>Patricia Tuladhar</h2>
            <div style={{ marginTop: 8, font: '400 16px/24px var(--font-body)', color: PALETTE.sub }}>Date of Birth: <span style={{ color: 'var(--neutral-900)' }}>02/18/1978</span></div>
            <div style={{ marginTop: 2, font: '400 16px/24px var(--font-body)', color: PALETTE.sub }}>Order Number: <span style={{ color: 'var(--neutral-900)' }}>1853-6203-7047</span></div>
            <div style={{ marginTop: 10, font: '700 12px/20px var(--font-body)', color: PALETTE.ink }}>PhilRx AZ</div>
          </div>

          <Alert eyebrow="Claim Rejected" code="Code: 75" source="Albertson Pharmacy" tone="red">
            Insurance exception reported by PP. Reason code: 75 - Prior Authorization Required.
          </Alert>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ font: '700 12px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: PALETTE.sub }}>Previous Prior Authorizations</span>
            <div style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'inset 0 0 0 1px var(--color-border-muted)', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <StatusPill status="approved" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <KeyValue label="CMM Key" value="1201011 ↗" variant="link" />
                <KeyValue label="Member ID" value="W72057801200" />
                <KeyValue label="Created" value="03/20/2020" />
                <KeyValue label="Expired" value="03/20/2021" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: the start-PA form, on a tinted panel */}
        <div style={{ padding: 32, backgroundColor: 'var(--blue-50)', display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'flex-start' }}>
          {status === 'pending' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <StatusPill status="pending" />
              <ProgressBar value={20} remainingLabel="5 days remaining" dayLabel="DAY 1 OF 5 BUSINESS DAYS" initiatedOn="06/20/2026" style={{ width: '100%' }} />
              <p style={{ margin: 0, font: '400 14px var(--font-body)', color: PALETTE.sub }}>Prior authorization submitted to {provider}. We'll post callbacks to the PA Queue as they arrive.</p>
            </div>
          ) : (
            <React.Fragment>
              <Select label="Select Insurance Provider" value={provider}
                onChange={(e) => setProvider(e.target.value)}
                options={['United Healthcare CM', 'Aetna', 'Cigna', 'Medicare Part D Express Scripts']} />
              <Select label="Prior Authorization Type" value={paType}
                onChange={(e) => setPaType(e.target.value)} placeholder="Select Prior Authorization Type"
                options={['Standard', 'Urgent / Expedited', 'Appeal', 'Step Therapy Override']} />
              <Button intent="primary" size="lg" fullWidth disabled={!ready}
                onClick={() => onStart(provider)} style={{ marginTop: 8 }}>
                Start Prior Authorization
              </Button>
              <Button intent="link" size="lg" onClick={() => {}} style={{ alignSelf: 'center' }}>
                Already Submitted in CoverMyMeds
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    </Card>
  );
}

// ── Figma asset URLs (Edit Insurance drawer) ─────────────────────
const FIGMA_CARD_IMG  = 'https://www.figma.com/api/mcp/asset/1bf6c896-58e3-47bc-9b64-80c0fcd5acd5';
const FIGMA_EDIT_ICON = 'https://www.figma.com/api/mcp/asset/f87cb419-a9c9-4a2f-ac8e-174c74040808';
const FIGMA_ZOOM_IN   = 'https://www.figma.com/api/mcp/asset/3ed76917-1494-4d3b-a913-72e389681bf9';
const FIGMA_ROTATE    = 'https://www.figma.com/api/mcp/asset/b9ef02a0-30cf-4f6a-a7a3-89ae8ab7a922';

// Shared drawer field style — matches Figma exactly
const FIELD_INPUT = {
  width: '100%', border: 'none', outline: 'none', background: 'transparent',
  fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14,
  lineHeight: '20px', color: '#0a0a0a',
};
const FIELD_BOX = {
  background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8,
  padding: '13px 17px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
};
const FIELD_LABEL = {
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
  lineHeight: '20px', color: '#6b7280',
};

function DrawerField({ label, value, onChange }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={FIELD_LABEL}>{label}</span>
        <div style={FIELD_BOX}>
          <input value={value} onChange={onChange} style={FIELD_INPUT} />
        </div>
      </label>
    </div>
  );
}

// ── Edit Insurance Drawer ─────────────────────────────────────────
function EditInsuranceDrawer({ open, onClose }) {
  const [form, setForm] = useState({
    carrier: 'United Healthcare CM',
    memberId: 'U88294022',
    groupId: 'NYFED-02',
    bin: '610014',
    pcn: 'MEDDPRIME',
    type: 'Commercial',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', zIndex: 200,
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 397,
        background: '#f2f4f5', zIndex: 201, overflowY: 'auto',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
        paddingTop: 24,
      }}>

        {/* Header */}
        <div style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, flexShrink: 0,
            background: '#2363c3', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={FIGMA_EDIT_ICON} width={20} height={20} alt="" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, lineHeight: '18px', color: '#191c1d' }}>
              Edit Insurance
            </div>
            <div style={{ height: 15 }} />
          </div>
        </div>

        {/* Nav content */}
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Insurance card image + zoom toolbar */}
          <div>
            <div style={{ height: 226, width: '100%', overflow: 'hidden', position: 'relative', background: 'rgba(155,155,155,0.2)' }}>
              <img src={FIGMA_CARD_IMG} alt="Insurance card"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ background: '#f4f4f4', padding: '9px 9px', display: 'flex', alignItems: 'center', gap: 13 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 11, lineHeight: '16px', color: '#525252' }}>100%</span>
              <img src={FIGMA_ZOOM_IN} width={11} height={11} alt="zoom in" style={{ opacity: 0.7 }} />
              <img src={FIGMA_ZOOM_IN} width={11} height={11} alt="zoom out" style={{ opacity: 0.7, transform: 'scaleY(-1)' }} />
              <img src={FIGMA_ROTATE} width={14} height={14} alt="rotate" style={{ opacity: 0.7 }} />
              <img src={FIGMA_ROTATE} width={14} height={14} alt="rotate back" style={{ opacity: 0.7, transform: 'rotate(180deg) scaleY(-1)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 11, lineHeight: '16px', color: '#525252' }}>Reset</span>
            </div>
          </div>

          {/* Form fields */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DrawerField label="Primary Carrier" value={form.carrier} onChange={set('carrier')} />
            <DrawerField label="Member ID"       value={form.memberId} onChange={set('memberId')} />
            <DrawerField label="Group ID"        value={form.groupId}  onChange={set('groupId')} />
            <DrawerField label="BIN"             value={form.bin}      onChange={set('bin')} />
            <DrawerField label="PCN"             value={form.pcn}      onChange={set('pcn')} />

            {/* Type — select */}
            <div style={{ paddingBottom: 24 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={FIELD_LABEL}>Type</span>
                <div style={{ ...FIELD_BOX, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <select value={form.type} onChange={set('type')} style={{ ...FIELD_INPUT, appearance: 'none', cursor: 'pointer' }}>
                    {['Commercial', 'Medicare Part D', 'Medicaid', 'Tricare'].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <Icon name="chevron-down" size={16} color="#6b7280" style={{ flexShrink: 0, pointerEvents: 'none' }} />
                </div>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8, paddingBottom: 32 }}>
            <Button intent="primary" size="lg" fullWidth onClick={onClose}>Save</Button>
            <Button intent="link" size="lg" onClick={onClose} style={{ alignSelf: 'center', color: '#525252' }}>Close</Button>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Detail cards row ──────────────────────────────────────────────
function DetailRow() {
  const [insuranceEditOpen, setInsuranceEditOpen] = useState(false);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <Card title="Patient Profile" onCopy={() => {}}>
          <KeyValue label="Legal Name" value="Patricia Tuladhar" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <KeyValue label="Allergies" value="Cetirizine" valueColor="var(--color-text-danger)" />
            <KeyValue label="DOB" value="02/18/1978" />
          </div>
          <KeyValue label="Address" value={"1294 Evergreen Terrace, Apt 4B\nNew York, NY 10012"} />
          <Button intent="link" size="sm" onClick={() => {}} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>

        <Card title="Insurance Details (1)" onCopy={() => {}}>
          <Tag color="blue">Primary Insurance</Tag>
          <KeyValue label="Primary Carrier" value="United Healthcare CM" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <KeyValue label="Member ID" value="U88294022" />
            <KeyValue label="Group" value="NYFED-02" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <KeyValue label="BIN" value="610014" />
            <KeyValue label="PCN" value="MEDDPRIME" />
            <KeyValue label="Type" value="Commercial" />
          </div>
          <Button intent="link" size="sm" onClick={() => setInsuranceEditOpen(true)} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>

        <Card title="Doctor Information" onCopy={() => {}}>
          <KeyValue label="Full Name" value="Dr. Marc James" />
          <KeyValue label="Practice Name" value="Skin Expert MD" />
          <KeyValue label="Contact" value="(212) 555-0192 · Fax (212) 555-0193" />
          <Tag color="green" icon={<Icon name="check" size={10} />}>NPI Verified: 1942820011</Tag>
          <Button intent="link" size="sm" onClick={() => {}} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>
      </div>

      <EditInsuranceDrawer open={insuranceEditOpen} onClose={() => setInsuranceEditOpen(false)} />
    </>
  );
}

// ── Medication + MD notes ─────────────────────────────────────────
function MedRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
      <Card title="Medication Information" onCopy={() => {}}>
        <KeyValue label="Drug Name" value="TYRVAYA (VARENICLINE SOLUTION) 0.03MG NASAL SPRAY" variant="title" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <KeyValue label="RX Number" value="9941120-A" />
          <KeyValue label="NDC" value="73516-0001-01" />
          <KeyValue label="Drug Type" value="Generic" />
          <KeyValue label="Quantity" value="4" />
          <KeyValue label="Day of Supply" value="30" />
          <KeyValue label="Refill Written" value="11" />
          <KeyValue label="ICD10 Code" value="I10" />
          <KeyValue label="DAW Code" value="1" />
          <KeyValue label="Manufacturer" value="Oyster Point" />
        </div>
        <KeyValue label="SIG" value="Use one spray in each nostril twice daily, approximately 12 hours apart." />
        <Button intent="secondary" size="md" icon={<Icon name="folder" size={16} />} style={{ marginTop: 4 }}>
          View Manufacturer Business Rules
        </Button>
      </Card>

      <Card title="MD Notes" style={{ backgroundColor: 'var(--blue-50)' }}>
        <span style={{ font: '700 12px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Tried &amp; Failed Step Therapy</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['Methotrexate (Oral)', '3 months ago'], ['Clobetasol Propionate', '6 months ago']].map(([m, t]) => (
            <div key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '12px 14px' }}>
              <span style={{ font: '700 14px var(--font-body)', color: 'var(--color-text-default)' }}>{m}</span>
              <span style={{ font: 'italic 400 13px var(--font-body)', color: 'var(--color-text-secondary)' }}>Failed: {t}</span>
            </div>
          ))}
        </div>
        <span style={{ font: '700 12px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginTop: 4 }}>MD Progress Notes (latest)</span>
        <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 14 }}>
          <p style={{ margin: 0, font: '400 14px var(--font-body)', color: 'var(--neutral-900)', lineHeight: 1.5 }}>
            "Patient exhibits progressive decline in mobility despite standard first-line therapies. Recommendation for OncoRelief IV is based on genetic markers showing high affinity for the specific protein pathways targeted by this biologic…"
          </p>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: '400 12px var(--font-body)', color: 'var(--color-text-secondary)' }}>Last updated: 24h ago</span>
            <Icon name="external-link" size={16} color="var(--color-text-secondary)" />
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── SOP list ─────────────────────────────────────────────────────
const SOP_STEPS = [
  { n: 1,  text: 'Verify patient eligibility and active coverage before initiating PA.' },
  { n: 2,  text: 'Confirm the drug requires PA by checking the carrier formulary.' },
  { n: 3,  text: 'Collect ICD-10 diagnosis codes from the prescriber\'s notes.' },
  { n: 4,  text: 'Document any tried-and-failed step therapy medications with dates.' },
  { n: 5,  text: 'Submit PA via CoverMyMeds (CMM) or carrier portal — record the CMM key.' },
  { n: 6,  text: 'Set order to sleep for 30 mins post-submission; RPA will monitor callbacks.' },
  { n: 7,  text: 'If no callback within 24 h, contact carrier to confirm receipt.' },
  { n: 8,  text: 'On approval: update PA status, record CMM key, expiry date, and member ID.' },
  { n: 9,  text: 'On denial: document reason code, advise prescriber, initiate appeal if applicable.' },
  { n: 10, text: 'Log all manual actions in the PA Queue Comments with actor and timestamp.' },
];

function SOPList() {
  return (
    <div style={{ padding: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ font: '700 11px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        Standard Operating Procedure
      </span>
      {SOP_STEPS.map((s) => (
        <div key={s.n} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 6, background: '#fff', boxShadow: '0 1px 1px rgba(0,0,0,0.03)', wordBreak: 'break-word' }}>
          <span style={{ font: '800 12px var(--font-body)', color: 'var(--color-brand)', minWidth: 18, paddingTop: 1 }}>{s.n}.</span>
          <span style={{ font: '400 13px/1.5 var(--font-body)', color: 'var(--color-text-default)' }}>{s.text}</span>
        </div>
      ))}
    </div>
  );
}

// ── Right rail: PA Queue ──────────────────────────────────────────
const SEED = [
  { t: 'Provider Notification Success callback received from CMM. cmmKey: BY9YXEB7', m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem' },
  { t: 'Order woke up from sleep status', m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem' },
  { t: 'Start PA completed by RPA. Order put to sleep for 30 mins.', m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem' },
  { t: 'Create PA automation started via RPA. Order put to sleep for 10 mins.', m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem' },
  { t: 'Prescription transferred from Phil to Sterling Specialty Pharmacy.', m: 'Fri Aug 23, 2024 9:05 AM EDT · Emmanuel Abujan (Psup Agent)' },
];

function PAQueue({ feed, onSend, tab, setTab }) {
  return (
    <aside style={{ width: 'var(--sidebar-width)', flexShrink: 0, backgroundColor: 'var(--color-sidebar-bg)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '24px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-brand-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <span dangerouslySetInnerHTML={{ __html: paQueueIconRaw }} style={{ display: 'inline-flex', width: 20, height: 20 }} />
        </span>
        <span style={{ font: '700 18px var(--font-display)', color: 'rgb(25,28,29)' }}>PA Queue</span>
      </div>
      {/* Sliding tab switcher */}
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{ position: 'relative', display: 'flex', background: 'rgba(0,0,0,0.05)', borderRadius: 10, padding: 3 }}>
          {/* Sliding pill indicator */}
          <div style={{
            position: 'absolute', top: 3, bottom: 3,
            left: tab === 'comments' ? 3 : 'calc(50%)',
            width: 'calc(50% - 3px)',
            background: '#fff',
            borderRadius: 7,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'left 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
          {/* Tab buttons */}
          {[['comments', 'Comments', 'comment'], ['sop', 'PA Best Practice (SOP)', 'file']].map(([k, label, icon]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, padding: '8px 10px', borderRadius: 7, border: 'none',
              background: 'transparent',
              font: '500 12px var(--font-ui)',
              color: tab === k ? 'var(--color-brand)' : 'var(--neutral-600)',
              cursor: 'pointer', position: 'relative', zIndex: 1,
              transition: 'color 220ms ease',
              whiteSpace: 'nowrap', overflow: 'hidden',
            }}>
              <Icon name={icon} size={13} />{label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab panels — both always mounted so transitions are smooth */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        {/* Comments */}
        <div style={{
          position: 'absolute', inset: 0, overflowY: 'auto',
          padding: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12,
          opacity: tab === 'comments' ? 1 : 0,
          transform: tab === 'comments' ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          pointerEvents: tab === 'comments' ? 'auto' : 'none',
        }}>
          <CommentBox onSend={onSend} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border-muted)' }} />
            <span style={{ font: '400 12px var(--font-body)', color: 'var(--color-text-secondary)' }}>First fill</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border-muted)' }} />
          </div>
          {feed.map((c, i) => <CommentItem key={i} meta={c.m}>{c.t}</CommentItem>)}
        </div>

        {/* SOP */}
        <div style={{
          position: 'absolute', inset: 0, overflowY: 'auto',
          opacity: tab === 'sop' ? 1 : 0,
          transform: tab === 'sop' ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          pointerEvents: tab === 'sop' ? 'auto' : 'none',
        }}>
          <SOPList />
        </div>
      </div>
    </aside>
  );
}

export default function PADashboard() {
  const [status, setStatus] = useState('none');
  const [feed, setFeed] = useState(SEED);
  const [tab, setTab] = useState('comments');

  const start = (provider) => {
    setStatus('pending');
    setFeed((f) => [
      { t: `Create PA automation started via RPA for ${provider}. Order put to sleep for 10 mins.`, m: 'Fri Jun 20, 2026 11:02 AM EDT · PhilSystem' },
      ...f,
    ]);
  };
  const send = (text) => setFeed((f) => [{ t: text, m: 'Fri Jun 20, 2026 · You (PA Agent)' }, ...f]);

  return (
    <div style={{ minHeight: '100vh', background: PALETTE.appBg, display: 'flex', flexDirection: 'column' }}>
      <AppHeader
        logo={<span dangerouslySetInnerHTML={{ __html: philLogoRaw }} style={{ display: 'inline-flex', height: 32 }} />}
        style={{ position: 'sticky', top: 0, zIndex: 100 }}
      />
      <div style={{ flex: 1, display: 'flex', minHeight: 0, width: '100%', maxWidth: 1392, margin: '0 auto' }}>
        <main style={{ flex: 1, minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
          <HeroPanel status={status} onStart={start} />
          <DetailRow />
          <MedRow />
        </main>
        <PAQueue feed={feed} onSend={send} tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}
