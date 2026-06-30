/* PHIL Ops — Check Results Flow
   Same structure as StartPAFlow but with the "Current Prior Authorization" hero
   and a hide/show details toggle for the detail sections. */
import React, { useState } from 'react';
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

// ── Current PA section (left panel) ──────────────────────────────
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
          tone="red"
          value={87}
          remainingLabel="1 day remaining"
          dayLabel="DAY 4 OF 5 BUSINESS DAYS"
          initiatedOn="04/08/2026"
        />

        <div style={{ height: 1, background: 'var(--color-border-muted)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button intent="negativeSecondary" size="sm">
            Stop PA
          </Button>
          <Button intent="link" size="sm">
            Reset or Change Type
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────
// ── Animated reveal wrapper ───────────────────────────────────────
function Reveal({ show, children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: show ? '1fr' : '0fr',
      transition: 'grid-template-rows 280ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          paddingTop: show ? 0 : 0,
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
          <Radio
            key={opt} name={name} value={opt} label={opt}
            checked={value === opt} onChange={() => onChange(opt)}
          />
        ))}
      </div>
    </div>
  );
}

function HeroPanel() {
  const [q1, setQ1] = useState('');  // Has PA been completed and submitted?
  const [q2, setQ2] = useState('');  // Have we received the PA results?
  const [outcome, setOutcome]   = useState(''); // when q2 = Yes
  const [nextStep, setNextStep] = useState(''); // when q2 = No

  // Reset downstream when a question changes
  const handleQ1 = (v) => { setQ1(v); setQ2(''); setOutcome(''); setNextStep(''); };
  const handleQ2 = (v) => { setQ2(v); setOutcome(''); setNextStep(''); };

  const ready =
    q1 === 'No' ||
    (q1 === 'Yes' && q2 === 'Yes' && outcome !== '') ||
    (q1 === 'Yes' && q2 === 'No'  && nextStep !== '');

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

          {/* Q1 — always visible */}
          <Question
            label="Has the Prior Authorization been completed and submitted to the plan?"
            name="q1" options={['Yes', 'No']} value={q1} onChange={handleQ1}
          />

          {/* Q2 — revealed when Q1 = Yes */}
          <Reveal show={q1 === 'Yes'}>
            <Question
              label="Have we received the Prior Authorization results?"
              name="q2" options={['Yes', 'No']} value={q2} onChange={handleQ2}
            />
          </Reveal>

          {/* Outcomes — revealed when Q1=Yes, Q2=Yes */}
          <Reveal show={q1 === 'Yes' && q2 === 'Yes'}>
            <Question
              label="What is the PA outcome?"
              name="outcome"
              options={['Approved', 'Denied', 'PA Not Required']}
              value={outcome} onChange={setOutcome}
            />
          </Reveal>

          {/* Next steps — revealed when Q1=Yes, Q2=No */}
          <Reveal show={q1 === 'Yes' && q2 === 'No'}>
            <Question
              label="Next Steps"
              name="nextStep"
              options={['Needs Clinical Questions Completed - Send MDO Reminder']}
              value={nextStep} onChange={setNextStep}
            />
          </Reveal>

          <div style={{ flex: 1 }} />
          <Button intent="primary" size="lg" fullWidth disabled={!ready}>
            Submit
          </Button>
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
          <Button intent="link" size="lg" onClick={() => setShowDetails(v => !v)}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        {/* grid-template-rows animates height without a hard max-height value */}
        <div style={{
          display: 'grid',
          gridTemplateRows: showDetails ? '1fr' : '0fr',
          transition: 'grid-template-rows 320ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 20,
              opacity: showDetails ? 1 : 0,
              transform: showDetails ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 240ms ease, transform 240ms ease',
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
