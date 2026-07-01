/* PHIL Ops — Check Results Flow */
import { useState } from 'react';
import { Card }        from '../../components/layout/Card.jsx';
import { KeyValue }    from '../../components/layout/KeyValue.jsx';
import { Tag }         from '../../components/core/Tag.jsx';
import { Button }      from '../../components/core/Button.jsx';
import { Icon }        from '../../components/core/Icon.jsx';
import { StatusPill }  from '../../components/core/StatusPill.jsx';
import { ProgressBar } from '../../components/feedback/ProgressBar.jsx';
import { Radio }       from '../../components/forms/Radio.jsx';
import { DetailRow, PAQueue, MedRow } from './shared.jsx';

const SUB = 'var(--color-text-secondary)';

// ── Current PA section ────────────────────────────────────────────
function CurrentPASection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ font: '700 12px/16px var(--font-body)', letterSpacing: '.6px', textTransform: 'uppercase', color: SUB }}>
        Current Prior Authorization
      </span>
      <div style={{
        background: 'var(--color-surface-default)',
        border: '1px solid var(--color-border-muted)',
        borderRadius: 12, padding: 17,
        boxShadow: '0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <StatusPill status="submitted" />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <KeyValue label="CMM KEY" value="1201011" variant="link" />
          <KeyValue label="ID"      value="W72057801200" />
        </div>
        <ProgressBar
          tone="red" value={87}
          remainingLabel="1 day remaining"
          dayLabel="DAY 4 OF 5 BUSINESS DAYS"
          initiatedOn="04/08/2026"
        />
        <div style={{ height: 1, background: 'var(--color-border-muted)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button intent="negativeSecondary" size="sm">Stop PA</Button>
          <Button intent="link" size="sm">Reset or Change Type</Button>
        </div>
      </div>
    </div>
  );
}

// ── Animated reveal (for Q cascade) ──────────────────────────────
function Reveal({ show, children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: show ? '1fr' : '0fr',
      transition: 'grid-template-rows 280ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Radio question block ──────────────────────────────────────────
function Question({ label, name, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ font: '700 14px/20px var(--font-body)', color: SUB }}>{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(opt => (
          <Radio key={opt} name={name} value={opt} label={opt}
            checked={value === opt} onChange={() => onChange(opt)} />
        ))}
      </div>
    </div>
  );
}

// ── Outcome result card ───────────────────────────────────────────
function ResultCard({ tone, iconName, title, message, children, onReset }) {
  const palette = {
    green: { bg: 'color-mix(in srgb, var(--green-600) 10%, transparent)', color: 'var(--green-600)' },
    blue:  { bg: 'color-mix(in srgb, var(--blue-600) 10%, transparent)',  color: 'var(--blue-600)'  },
    teal:  { bg: 'color-mix(in srgb, var(--teal-300) 12%, transparent)',  color: 'var(--teal-300)'  },
    red:   { bg: 'color-mix(in srgb, var(--red-500)  10%, transparent)',  color: 'var(--red-500)'   },
  };
  const c = palette[tone] || palette.blue;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center', paddingTop: 8 }}>
        <span style={{ width: 52, height: 52, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={iconName} size={26} color={c.color} />
        </span>
        <h3 style={{ margin: 0, font: '700 18px var(--font-body)', color: 'var(--color-text-default)' }}>{title}</h3>
        {message && <p style={{ margin: 0, font: '400 14px/22px var(--font-body)', color: SUB, maxWidth: 320 }}>{message}</p>}
      </div>
      {children}
      <div style={{ flex: 1 }} />
      <Button intent="secondary" size="md" onClick={onReset} style={{ alignSelf: 'center', minWidth: 120 }}>
        Back
      </Button>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────
function HeroPanel() {
  const [q1, setQ1]           = useState('');
  const [q2, setQ2]           = useState('');
  const [outcome, setOutcome] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // Denied sub-flow
  const [appealChoice, setAppealChoice] = useState(''); // 'Yes' | 'No'
  const [denialResolved, setDenialResolved] = useState(false);

  const handleQ1 = (v) => { setQ1(v); setQ2(''); setOutcome(''); setNextStep(''); };
  const handleQ2 = (v) => { setQ2(v); setOutcome(''); setNextStep(''); };

  const ready =
    q1 === 'No' ||
    (q1 === 'Yes' && q2 === 'Yes' && outcome !== '') ||
    (q1 === 'Yes' && q2 === 'No'  && nextStep !== '');

  const reset = () => {
    setQ1(''); setQ2(''); setOutcome(''); setNextStep('');
    setSubmitted(false); setAppealChoice(''); setDenialResolved(false);
  };

  // Derive result type from form state
  const resultType =
    q1 === 'No'                                           ? 'pending'      :
    q1 === 'Yes' && q2 === 'Yes' && outcome === 'Approved'     ? 'approved'     :
    q1 === 'Yes' && q2 === 'Yes' && outcome === 'Denied'       ? 'denied'       :
    q1 === 'Yes' && q2 === 'Yes' && outcome === 'PA Not Required' ? 'not-required' :
    q1 === 'Yes' && q2 === 'No'                                ? 'clinical'     : null;

  // ── Right-panel content ─────────────────────────────────────────
  let rightContent;

  if (!submitted) {
    rightContent = (
      <>
        <Question label="Has the Prior Authorization been completed and submitted to the plan?"
          name="q1" options={['Yes', 'No']} value={q1} onChange={handleQ1} />

        <Reveal show={q1 === 'Yes'}>
          <Question label="Have we received the Prior Authorization results?"
            name="q2" options={['Yes', 'No']} value={q2} onChange={handleQ2} />
        </Reveal>

        <Reveal show={q1 === 'Yes' && q2 === 'Yes'}>
          <Question label="What is the PA outcome?" name="outcome"
            options={['Approved', 'Denied', 'PA Not Required']}
            value={outcome} onChange={setOutcome} />
        </Reveal>

        <Reveal show={q1 === 'Yes' && q2 === 'No'}>
          <Question label="Next Steps" name="nextStep"
            options={['Needs Clinical Questions Completed - Send MDO Reminder']}
            value={nextStep} onChange={setNextStep} />
        </Reveal>

        <div style={{ flex: 1 }} />
        <Button intent="primary" size="lg" fullWidth disabled={!ready}
          onClick={() => setSubmitted(true)}>
          Submit
        </Button>
      </>
    );

  } else if (resultType === 'pending') {
    rightContent = (
      <ResultCard tone="blue" iconName="clock" title="Pending Submission" onReset={reset}
        message="PA has not been submitted yet. Task returned to PA Queue with a 'Pending Submission' note. Agent to follow up with plan." />
    );

  } else if (resultType === 'approved') {
    rightContent = (
      <ResultCard tone="green" iconName="check-circle" title="PA Approved" onReset={reset}
        message="PA status recorded. CMM key, expiry date, and member ID logged. Order advanced to dispensing queue." />
    );

  } else if (resultType === 'not-required') {
    rightContent = (
      <ResultCard tone="teal" iconName="check-circle" title="PA Not Required" onReset={reset}
        message="PA block removed. Claim re-submitted directly to insurance. Order continues dispensing." />
    );

  } else if (resultType === 'clinical') {
    rightContent = (
      <ResultCard tone="blue" iconName="clock" title="Clinical Questions Pending" onReset={reset}
        message="Note added to PA Queue Comments. Order set to sleep for 24 h. MDO reminder fax sent to prescriber." />
    );

  } else if (resultType === 'denied') {
    if (!denialResolved) {
      rightContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
          {/* Denial alert */}
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: '12px 14px', borderRadius: 8,
            background: 'color-mix(in srgb, var(--red-500) 8%, transparent)',
            border: '1px solid color-mix(in srgb, var(--red-500) 22%, transparent)',
          }}>
            <Icon name="alert-circle" size={16} color="var(--color-text-danger)" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ font: '700 13px var(--font-body)', color: 'var(--color-text-danger)' }}>PA Denied</div>
              <div style={{ font: '400 12px var(--font-body)', color: SUB, marginTop: 2 }}>
                Reason code logged. Prescriber notification queued.
              </div>
            </div>
          </div>

          <Question
            label="Does the manufacturer offer an appeal?"
            name="appealQ" options={['Yes', 'No']}
            value={appealChoice} onChange={setAppealChoice}
          />

          <div style={{ flex: 1 }} />

          <Button intent="primary" size="lg" fullWidth
            disabled={appealChoice === ''}
            onClick={() => setDenialResolved(true)}>
            {appealChoice === 'Yes' ? 'Initiate Appeal' : 'Process as Approved'}
          </Button>
          <Button intent="link" size="sm" onClick={reset} style={{ alignSelf: 'center' }}>Back</Button>
        </div>
      );
    } else if (appealChoice === 'Yes') {
      rightContent = (
        <ResultCard tone="blue" iconName="arrow-up-right" title="Appeal Initiated" onReset={reset}
          message="Manufacturer appeal submitted. Denial reason code and prescriber details forwarded. Monitor for appeal decision." />
      );
    } else {
      rightContent = (
        <ResultCard tone="green" iconName="check-circle" title="Processing as Approved" onReset={reset}
          message="Manufacturer does not offer an appeal. PA block overridden — order continues to dispensing queue." />
      );
    }
  }

  return (
    <Card padding={0} style={{ overflow: 'hidden' }} bodyStyle={{ gap: 0 }}>
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Left */}
        <div style={{ flex: '1 1 auto', maxWidth: 503, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Tag color="teal" icon={<Icon name="check-circle" size={11} />}>CHECK RESULTS</Tag>
          <div>
            <h2 style={{ margin: 0, font: '900 36px/40px var(--font-body)', color: 'var(--color-brand)' }}>Patricia Tuladhar</h2>
            <div style={{ marginTop: 8, font: '400 16px/24px var(--font-body)', color: SUB }}>Date of Birth: <span style={{ color: 'var(--neutral-900)' }}>02/18/1978</span></div>
            <div style={{ marginTop: 2, font: '400 16px/24px var(--font-body)', color: SUB }}>Order Number: <span style={{ color: 'var(--neutral-900)' }}>1853-6203-7047</span></div>
            <div style={{ marginTop: 10, font: '700 12px/20px var(--font-body)', color: 'var(--color-text-default)' }}>PhilRx AZ</div>
          </div>
          <CurrentPASection />
        </div>

        {/* Right */}
        <div style={{ flex: '1 1 auto', maxWidth: 450, padding: 32, backgroundColor: 'var(--blue-50)', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
          {rightContent}
        </div>
      </div>
    </Card>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function CheckResultsFlow() {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <div style={{ flex: 1, display: 'flex', minHeight: 0, width: '100%', maxWidth: 1392, margin: '0 auto' }}>
      <main style={{ flex: 1, minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
        <HeroPanel />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button intent="link" size="md" onClick={() => setShowDetails(v => !v)}>
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
              transform: showDetails ? 'translateY(0)' : 'translateY(-10px)',
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
