/* PHIL Ops — Start PA Flow
   Differences from PADashboard: peek carousel for Previous PAs, extra medication fields,
   richer PA Queue feed. Everything else identical — all shared components reused. */
import React, { useState, useRef, useEffect } from 'react';
import paQueueIconRaw from '../../assets/Icons/PA_Queue_Icon.svg?raw';
import { Card }        from '../../components/layout/Card.jsx';
import { KeyValue }    from '../../components/layout/KeyValue.jsx';
import { Tag }         from '../../components/core/Tag.jsx';
import { Button }      from '../../components/core/Button.jsx';
import { Icon }        from '../../components/core/Icon.jsx';
import { Alert }       from '../../components/feedback/Alert.jsx';
import { Select }      from '../../components/forms/Select.jsx';
import { Input }       from '../../components/forms/Input.jsx';
import { Radio }       from '../../components/forms/Radio.jsx';
import { CommentBox, CommentItem } from '../../components/feedback/CommentBox.jsx';
import { DetailRow } from './shared.jsx';

const SUB = 'var(--color-text-secondary)';

// ── Previous PA peek-carousel ─────────────────────────────────────
const PREV_PAS = [
  { status: 'approved', cmmKey: '1201011', memberId: 'W72057801200', created: '03/20/2020', expired: '03/20/2021' },
  { status: 'denied',   cmmKey: '1201011', memberId: '—',            created: '03/20/2020', expired: '—' },
  { status: 'expired',  cmmKey: '1100892', memberId: 'W72057801200', created: '01/10/2019', expired: '01/10/2020' },
];

const PA_STATUS = {
  approved: { bg: 'color-mix(in srgb, var(--teal-300) 7%, transparent)', dot: 'var(--teal-300)', text: 'var(--teal-300)', label: 'PA APPROVED' },
  denied:   { bg: 'color-mix(in srgb, var(--red-800) 8%, transparent)',  dot: 'var(--red-800)',  text: 'var(--red-800)',  label: 'PA DENIED' },
  expired:  { bg: 'color-mix(in srgb, var(--amber-600) 8%, transparent)',dot: 'var(--amber-600)',text: 'var(--amber-600)',label: 'PA EXPIRED' },
};

const PA_LABEL = {
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 10,
  color: 'var(--neutral-500)', textTransform: 'uppercase', letterSpacing: '-0.5px',
  lineHeight: '15px',
};
const PA_VALUE = {
  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
  color: 'var(--color-text-default)', lineHeight: '20px',
};

function PAStatusPill({ status }) {
  const s = PA_STATUS[status] || PA_STATUS.approved;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 9999, background: s.bg }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 12, color: s.text, textTransform: 'uppercase', lineHeight: '16px' }}>
        {s.label}
      </span>
    </div>
  );
}

function PACard({ pa, active }) {
  return (
    <div style={{
      flexShrink: 0,
      borderRadius: 12, padding: 17,
      background: 'var(--color-surface-default)',
      border: `1px solid ${active ? 'var(--blue-600)' : 'var(--color-border-muted)'}`,
      boxShadow: 'var(--shadow-xs)',
      display: 'flex', flexDirection: 'column', gap: 10,
      opacity: active ? 1 : 0.7,
      transition: 'border-color 200ms ease, opacity 200ms ease',
    }}>
      <PAStatusPill status={pa.status} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={PA_LABEL}>CMM KEY</span>
          <span style={{ ...PA_VALUE, color: 'var(--blue-600)', textDecoration: 'underline' }}>{pa.cmmKey}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={PA_LABEL}>MEMBER ID</span>
          <span style={PA_VALUE}>{pa.memberId}</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={PA_LABEL}>CREATED</span>
          <span style={PA_VALUE}>{pa.created}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={PA_LABEL}>EXPIRED</span>
          <span style={PA_VALUE}>{pa.expired}</span>
        </div>
      </div>
    </div>
  );
}

function PreviousPACarousel() {
  const [idx, setIdx] = useState(0);
  const containerRef = useRef(null);
  const [cardW, setCardW] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setCardW(containerRef.current.offsetWidth * 0.72);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const goTo = (newIdx) => setIdx(Math.max(0, Math.min(PREV_PAS.length - 1, newIdx)));
  const offset = cardW ? -(idx * (cardW + 8)) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, letterSpacing: '.6px', textTransform: 'uppercase', color: SUB }}>
          Previous Prior Authorizations ({idx + 1}/{PREV_PAS.length})
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{ dir: -1, name: 'chevron-left' }, { dir: 1, name: 'chevron-right' }].map(({ dir, name }) => {
            const disabled = dir === -1 ? idx === 0 : idx === PREV_PAS.length - 1;
            return (
              <button key={name} onClick={() => goTo(idx + dir)} style={{
                width: 24, height: 24, borderRadius: '50%', padding: 0, cursor: disabled ? 'default' : 'pointer',
                border: '0.75px solid var(--color-border-muted)', background: 'var(--color-surface-default)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                opacity: disabled ? 0.5 : 1,
                boxShadow: disabled ? 'none' : 'var(--shadow-xs)',
              }}>
                <Icon name={name} size={12} color="var(--color-text-default)" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Track */}
      <div ref={containerRef} style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: 8,
          transform: `translateX(${offset}px)`,
          transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {PREV_PAS.map((pa, i) => (
            <div key={i} style={{ minWidth: cardW || '72%', flexShrink: 0 }}>
              <PACard pa={pa} active={i === idx} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 4 }}>
        {PREV_PAS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0,
            background: i === idx ? 'var(--blue-600)' : 'var(--color-border-muted)',
            cursor: 'pointer', transition: 'background 200ms ease',
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Radio question helper ─────────────────────────────────────────
function RadioQuestion({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, color: 'var(--color-text-default)', lineHeight: '20px' }}>{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {['Yes', 'No'].map(opt => (
          <Radio key={opt} name={label} value={opt} checked={value === opt} onChange={() => onChange(opt)}
            label={opt} />
        ))}
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────
function HeroPanel() {
  const [provider, setProvider] = useState('United Healthcare CM');
  const [paType, setPaType]     = useState('');
  const [cmmKey, setCmmKey]     = useState('');
  const [q1, setQ1]             = useState('');
  const [q2, setQ2]             = useState('');

  const isCMM  = paType === 'CoverMyMeds';
  const ready  = provider && paType && (!isCMM || (cmmKey && q1 && q2));

  return (
    <Card padding={0} style={{ overflow: 'hidden' }} bodyStyle={{ gap: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', alignItems: 'stretch' }}>
        {/* Left */}
        <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Tag color="blue" icon={<Icon name="shield-check" size={11} />}>START PA</Tag>
          <div>
            <h2 style={{ margin: 0, font: '900 36px/40px var(--font-body)', color: 'var(--color-brand)' }}>Patricia Tuladhar</h2>
            <div style={{ marginTop: 8, font: '400 16px/24px var(--font-body)', color: SUB }}>Date of Birth: <span style={{ color: 'var(--neutral-900)' }}>02/18/1978</span></div>
            <div style={{ marginTop: 2, font: '400 16px/24px var(--font-body)', color: SUB }}>Order Number: <span style={{ color: 'var(--neutral-900)' }}>1853-6203-7047</span></div>
            <div style={{ marginTop: 10, font: '700 12px/20px var(--font-body)', color: 'var(--color-text-default)' }}>PhilRx AZ</div>
          </div>
          <Alert eyebrow="Claim Rejected" code="Code: 75" source="Albertson Pharmacy" tone="red">
            Insurance exception reported by PP. Reason code: 75 - Prior Authorization Required.
          </Alert>
          <PreviousPACarousel />
        </div>

        {/* Right */}
        <div style={{ padding: 32, backgroundColor: 'var(--blue-50)', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
          <Select label="Select Insurance Provider" value={provider}
            onChange={(e) => setProvider(e.target.value)}
            options={['United Healthcare CM', 'Aetna', 'Cigna', 'Medicare Part D Express Scripts']} />
          <Select label="Prior Authorization Type" value={paType}
            onChange={(e) => setPaType(e.target.value)} placeholder="Select Prior Authorization Type"
            options={['Standard', 'Urgent / Expedited', 'Appeal', 'Step Therapy Override', 'CoverMyMeds']} />

          {/* CoverMyMeds extra fields */}
          {isCMM && (
            <>
              <Input label="CMM Key" value={cmmKey} onChange={(e) => setCmmKey(e.target.value)} placeholder="Enter CMM key..." />
              <RadioQuestion
                label="Were the clinical questions generated while you were working on the request?"
                value={q1} onChange={setQ1}
              />
              <RadioQuestion
                label="Can the renewal PA be submitted to the plan prior to the current PA expiration?"
                value={q2} onChange={setQ2}
              />
            </>
          )}

          <Button intent="primary" size="lg" fullWidth disabled={!ready} style={{ marginTop: 4 }}>
            Start Prior Authorization
          </Button>
          <Button intent="link" size="lg" style={{ alignSelf: 'center' }}>
            Already Submitted in CoverMyMeds
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ── Medication (expanded fields from Figma) ───────────────────────
function MedRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
      <Card title="Medication Information" onCopy={() => {}}>
        <KeyValue label="Drug Name" value="TYRVAYA (VARENICLINE SOLUTION) 0.03MG NASAL SPRAY" variant="title" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <KeyValue label="RX Number"       value="9941120-A" />
          <KeyValue label="NDC"             value="73516-0001-01" />
          <KeyValue label="Drug Type"       value="Generic" />
          <KeyValue label="Quantity"        value="4" />
          <KeyValue label="Day of Supply"   value="30" />
          <KeyValue label="Refill Written"  value="11" />
          <KeyValue label="Fills Completed" value="0-6" />
          <KeyValue label="Package Size"    value="4" />
          <KeyValue label="Controlled"      value="—" />
          <KeyValue label="ICD10 Code"      value="I10" />
          <KeyValue label="DAW Code"        value="1" />
          <KeyValue label="Manufacturer"    value="Oyster Point" />
        </div>
        <KeyValue label="SIG" value="USE ONE SPRAY IN EACH NOSTRIL TWICE DAILY APPROXIMATELY 12 HOURS APART" />
        <Button intent="secondary" size="md" icon={<Icon name="folder" size={16} />} style={{ marginTop: 4 }}>
          View Manufacturer Business Rules
        </Button>
        <Button intent="link" size="sm" style={{ alignSelf: 'flex-start' }}>EDIT</Button>
      </Card>

      <Card title="MD Notes" style={{ backgroundColor: 'var(--blue-50)' }}>
        <span style={{ font: '700 12px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: SUB }}>Tried &amp; Failed Step Therapy</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['Methotrexate (Oral)', '3 months ago'], ['Clobetasol Propionate', '6 months ago']].map(([m, t]) => (
            <div key={m} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface-default)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '12px 14px' }}>
              <span style={{ font: '700 14px var(--font-body)', color: 'var(--color-text-default)' }}>{m}</span>
              <span style={{ font: 'italic 400 13px var(--font-body)', color: SUB }}>Failed: {t}</span>
            </div>
          ))}
        </div>
        <span style={{ font: '700 12px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: SUB, marginTop: 4 }}>MD Progress Notes (latest)</span>
        <div style={{ background: 'var(--color-surface-default)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 14 }}>
          <p style={{ margin: 0, font: '400 14px var(--font-body)', color: 'var(--neutral-900)', lineHeight: 1.5 }}>
            "Patient exhibits progressive decline in mobility despite standard first-line therapies. Recommendation for OncoRelief IV is based on genetic markers showing high affinity for the specific protein pathways targeted by this biologic…"
          </p>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ font: '400 12px var(--font-body)', color: SUB }}>Last updated: 24h ago</span>
            <Icon name="external-link" size={16} color={SUB} />
          </div>
        </div>
      </Card>
    </div>
  );
}

// ── PA Queue ─────────────────────────────────────────────────────
const FEED = [
  { t: 'Provider Notification Success callback received from CMM. cmmKey: BY9YXEB7', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Sleep Status Removed.', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'PA created callback received from CMM. cmmKey: BY9YXEB7', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Order woke up from sleep status', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Start PA completed by RPA. Order put to sleep for 30 mins', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Insurance info mismatch: Insurance was updated in BestRx by RPA. Insurance - Provider Name: MEDICARE PART D EXPRESS SCRIPTS, Insurance Id: 47016793, BIN Number: 610014, PCN Number: meddprime, Grp Number: 2FGA', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Create PA automation started via RPA. Order put to sleep for 10 mins', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Failed to create PA request via BestRx API. Error: Patient and prescription does not match. err: BestRx payment method is Cash. PA requests are not allowed for cash prescriptions.', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Insurance exception reported by PP. Reason code: 569 - Provide Notice: Medicare Prescription Drug Coverage and Your Rights; MR - Product Not On Formulary', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'PRESCRIPTION_TRANSFER fax was delivered successfully', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by PhilSystem' },
  { t: 'Prescription transferred from Phil to Sterling Specialty Pharmacy.', m: 'Fri Aug 23, 2024 9:05:49 AM EDT · by Emmanuel Abujan (Psup Agent)' },
];

function PAQueue() {
  const [tab, setTab] = useState('comments');
  const [feed, setFeed] = useState(FEED);
  const send = (text) => setFeed(f => [{ t: text, m: 'Today · You (PA Agent)' }, ...f]);

  return (
    <aside style={{ width: 'var(--sidebar-width)', flexShrink: 0, backgroundColor: 'var(--color-sidebar-bg)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '24px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-brand-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <span dangerouslySetInnerHTML={{ __html: paQueueIconRaw }} style={{ display: 'inline-flex', width: 20, height: 20 }} />
        </span>
        <span style={{ font: '700 18px var(--font-display)', color: 'var(--color-text-default)' }}>PA Queue</span>
      </div>
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <div style={{ position: 'relative', display: 'flex', background: 'color-mix(in srgb, var(--neutral-1000) 5%, transparent)', borderRadius: 10, padding: 3 }}>
          <div style={{
            position: 'absolute', top: 3, bottom: 3,
            left: tab === 'comments' ? 3 : 'calc(50%)',
            width: 'calc(50% - 3px)',
            background: 'var(--color-surface-default)', borderRadius: 7, boxShadow: 'var(--shadow-sm)',
            transition: 'left 220ms cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
          {[['comments', 'Comments', 'comment'], ['sop', 'PA Best Practice (SOP)', 'file']].map(([k, label, icon]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, padding: '8px 10px', borderRadius: 7, border: 'none', background: 'transparent',
              font: '500 12px var(--font-ui)', color: tab === k ? 'var(--color-brand)' : 'var(--neutral-600)',
              cursor: 'pointer', position: 'relative', zIndex: 1,
              transition: 'color 220ms ease', whiteSpace: 'nowrap', overflow: 'hidden',
            }}>
              <Icon name={icon} size={13} />{label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, overflowY: 'auto',
          padding: '8px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12,
          opacity: tab === 'comments' ? 1 : 0,
          transform: tab === 'comments' ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          pointerEvents: tab === 'comments' ? 'auto' : 'none',
        }}>
          <CommentBox onSend={send} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border-muted)' }} />
            <span style={{ font: '400 12px var(--font-body)', color: SUB }}>First fill</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-border-muted)' }} />
          </div>
          {feed.map((c, i) => <CommentItem key={i} meta={c.m}>{c.t}</CommentItem>)}
        </div>
        <div style={{
          position: 'absolute', inset: 0, overflowY: 'auto',
          opacity: tab === 'sop' ? 1 : 0,
          transform: tab === 'sop' ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
          pointerEvents: tab === 'sop' ? 'auto' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}>
          <span style={{ font: '400 13px var(--font-body)', color: SUB, textAlign: 'center' }}>PA Best Practice (SOP) content</span>
        </div>
      </div>
    </aside>
  );
}

// ── Page (no AppHeader — parent provides it) ──────────────────────
export default function StartPAFlow() {
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, width: '100%', maxWidth: 1392, margin: '0 auto' }}>
      <main style={{ flex: 1, minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
        <HeroPanel />
        <DetailRow />
        <MedRow />
      </main>
      <PAQueue />
    </div>
  );
}
