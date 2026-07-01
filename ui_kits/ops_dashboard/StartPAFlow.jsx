/* PHIL Ops — Start PA Flow
   Differences from PADashboard: peek carousel for Previous PAs, extra medication fields,
   richer PA Queue feed. Everything else identical — all shared components reused. */
import { useState } from 'react';
import { Card }        from '../../components/layout/Card.jsx';
import { KeyValue }    from '../../components/layout/KeyValue.jsx';
import { Tag }        from '../../components/core/Tag.jsx';
import { Button }     from '../../components/core/Button.jsx';
import { Icon }       from '../../components/core/Icon.jsx';
import { StatusPill } from '../../components/core/StatusPill.jsx';
import { Alert }       from '../../components/feedback/Alert.jsx';
import { Select }      from '../../components/forms/Select.jsx';
import { Input }       from '../../components/forms/Input.jsx';
import { Radio }       from '../../components/forms/Radio.jsx';
import { DetailRow, PAQueue, MedRow } from './shared.jsx';

const SUB = 'var(--color-text-secondary)';

// ── Previous PA carousel ─────────────────────────────────────────
const PREV_PAS = [
  { status: 'approved', cmmKey: '1201011', memberId: 'W72057801200', created: '03/20/2020', expired: '03/20/2021' },
  { status: 'denied',   cmmKey: '1201011', memberId: '—',            created: '03/20/2020', expired: '—' },
  { status: 'expired',  cmmKey: '1100892', memberId: 'W72057801200', created: '01/10/2019', expired: '01/10/2020' },
];

const CARD_W = 285;
const CARD_GAP = 16;

function PACard({ pa, active }) {
  return (
    <div style={{
      width: CARD_W, borderRadius: 12, padding: 17,
      background: 'var(--color-surface-default)',
      border: `1px solid ${active ? 'var(--blue-600)' : 'var(--color-border-muted)'}`,
      boxShadow: active ? '0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)' : 'none',
      display: 'flex', flexDirection: 'column', gap: 10,
      transition: 'border-color 200ms ease, box-shadow 200ms ease',
    }}>
      <StatusPill status={pa.status} />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <KeyValue label="CMM KEY"   value={pa.cmmKey}    variant="link" />
        <KeyValue label="MEMBER ID" value={pa.memberId} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <KeyValue label="CREATED" value={pa.created} />
        <KeyValue label="EXPIRED" value={pa.expired} />
      </div>
    </div>
  );
}

function ChevronBtn({ icon, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 24, height: 24, borderRadius: '50%', padding: 0,
      border: '0.75px solid var(--color-border-muted)',
      background: 'var(--color-surface-default)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
      boxShadow: disabled ? 'none' : 'var(--shadow-xs)',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'opacity 150ms ease',
    }}>
      <Icon name={icon} size={12} color="var(--color-text-default)" />
    </button>
  );
}

function PreviousPACarousel() {
  const [idx, setIdx] = useState(0);
  const total = PREV_PAS.length;
  const goTo = (n) => setIdx(Math.max(0, Math.min(total - 1, n)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, letterSpacing: '.6px', textTransform: 'uppercase', color: SUB }}>
          Previous Prior Authorizations ({idx + 1}/{total})
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <ChevronBtn icon="chevron-left"  onClick={() => goTo(idx - 1)} disabled={idx === 0} />
          <ChevronBtn icon="chevron-right" onClick={() => goTo(idx + 1)} disabled={idx === total - 1} />
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: CARD_GAP,
          transform: `translateX(${-(idx * (CARD_W + CARD_GAP))}px)`,
          transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {PREV_PAS.map((pa, i) => (
            <div key={i} style={{ flex: '0 0 auto' }}>
              <PACard pa={pa} active={i === idx} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 8 }}>
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
      <span style={{ font: '700 14px/20px var(--font-body)', color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Yes', 'No'].map(opt => (
          <Radio
            key={opt} name={label} value={opt} label={opt}
            checked={value === opt} onChange={(v) => onChange(v)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────
function SuccessModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--color-surface-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 48px',
        maxWidth: 440, width: '90%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        textAlign: 'center',
      }} onClick={e => e.stopPropagation()}>
        <span style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'color-mix(in srgb, var(--teal-300) 12%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="check-circle" size={28} color="var(--teal-300)" />
        </span>
        <h2 style={{ margin: 0, font: '700 22px/28px var(--font-body)', color: 'var(--color-text-default)' }}>
          Success
        </h2>
        <p style={{ margin: 0, font: '400 15px/22px var(--font-body)', color: 'var(--color-text-secondary)' }}>
          Prior authorization has been successfully initiated.
        </p>
        <Button intent="primary" size="lg" style={{ marginTop: 8, minWidth: 140 }} onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}

function HeroPanel() {
  const [provider, setProvider] = useState('United Healthcare CM');
  const [paType, setPaType]     = useState('');
  const [cmmKey, setCmmKey]     = useState('');
  const [q1, setQ1]             = useState('');
  const [q2, setQ2]             = useState('');
  const [success, setSuccess]   = useState(false);

  const isCMM  = paType === 'CoverMyMeds';
  const ready  = provider && paType && (!isCMM || (cmmKey && q1 && q2));

  return (
    <>
    {success && <SuccessModal onClose={() => setSuccess(false)} />}
    <Card padding={0} style={{ overflow: 'hidden' }} bodyStyle={{ gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Left */}
        <div style={{ flex: '1 1 auto', maxWidth: 503, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <div style={{ flex: '1 1 auto', maxWidth: 450, padding: 32, backgroundColor: 'var(--blue-50)', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
          <Select label="Select Insurance Provider" value={provider}
            onChange={(e) => setProvider(e.target.value)}
            options={['United Healthcare CM', 'Aetna', 'Cigna', 'Medicare Part D Express Scripts']} />
          <Select label="Prior Authorization Type" value={paType}
            onChange={(e) => setPaType(e.target.value)} placeholder="Select Prior Authorization Type"
            options={['CMM', 'Verbal', 'Weblink', 'CoverMyMeds']} />

          {/* CoverMyMeds extra fields */}
          {isCMM && (
            <>
              <div style={{ height: 1, background: 'var(--color-border-muted)', margin: '0 -32px' }} />
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

          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Button intent="primary" size="lg" fullWidth disabled={!ready} onClick={() => setSuccess(true)}>
              Start Prior Authorization
            </Button>
            <Button intent="link" size="lg" style={{ alignSelf: 'center' }}>
              Already Submitted in CoverMyMeds
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </>
  );
}

// ── Page (no AppHeader — parent provides it) ──────────────────────
export default function StartPAFlow() {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, width: '100%', maxWidth: 1392, margin: '0 auto' }}>
      <main style={{ flex: 1, minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
        <HeroPanel />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button intent="link" size="lg" onClick={() => setShowDetails(v => !v)}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateRows: showDetails ? '1fr' : '0fr',
          transition: 'grid-template-rows 340ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 20,
              opacity: showDetails ? 1 : 0,
              transform: showDetails ? 'none' : 'translateY(-10px)',
              transition: 'opacity 260ms ease, transform 260ms ease',
            }}>
              <DetailRow />
              <MedRow />
            </div>
          </div>
        </div>
      </main>
      <PAQueue />
    </div>
  );
}
