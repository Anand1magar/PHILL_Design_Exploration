import React, { useState, useRef, useEffect } from 'react';
import philLogoRaw  from '../../assets/phil Logo.svg?raw';
import paQueueIconRaw from '../../assets/Icons/PA_Queue_Icon.svg?raw';
import zoomInIconRaw from '../../assets/Icons/zoom-in.svg?raw';
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
import { EditInsuranceDrawer, DetailRow, MedRow } from './shared.jsx';
import StartPAFlow       from './StartPAFlow.jsx';
import CheckResultsFlow  from './CheckResultsFlow.jsx';

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
        <div key={s.n} style={{ display: 'flex', gap: 12, padding: '14px 16px', borderRadius: 6, background: 'var(--color-surface-default)', boxShadow: `0 1px 1px color-mix(in srgb, var(--neutral-1000) 3%, transparent)`, wordBreak: 'break-word' }}>
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
        <div style={{ position: 'relative', display: 'flex', background: 'color-mix(in srgb, var(--neutral-1000) 5%, transparent)', borderRadius: 10, padding: 3 }}>
          {/* Sliding pill indicator */}
          <div style={{
            position: 'absolute', top: 3, bottom: 3,
            left: tab === 'comments' ? 3 : 'calc(50%)',
            width: 'calc(50% - 3px)',
            background: 'var(--color-surface-default)',
            borderRadius: 7,
            boxShadow: 'var(--shadow-sm)',
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

// ── Screens registry ─────────────────────────────────────────────
const SCREENS = [
  { id: 1, label: 'PA Dashboard',       sub: 'Prior auth ops console',    accent: 'var(--color-brand)' },
  { id: 2, label: 'Start PA Flow',      sub: 'Live authorization tracker', accent: 'var(--blue-600)' },
  { id: 3, label: 'Check Results Flow', sub: 'Check & submit PA results',   accent: 'var(--purple-600)' },
  { id: 4, label: 'Claim History',      sub: 'Rejected & resolved claims', accent: 'var(--amber-600)' },
  { id: 5, label: 'PA Archive',         sub: 'Closed prior authorizations', accent: 'var(--green-600)' },
];

// ── Side navigation ───────────────────────────────────────────────
function SideNav({ open, onClose, activeScreen, onSelect }) {
  const navRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 150,
        background: 'color-mix(in srgb, var(--neutral-1000) 30%, transparent)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 220ms ease',
      }} />

      {/* Drawer */}
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 256, zIndex: 151,
        background: 'var(--color-surface-default)',
        boxShadow: `4px 0 24px color-mix(in srgb, var(--neutral-1000) 12%, transparent)`,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 260ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          height: 'var(--header-height)', display: 'flex', alignItems: 'center',
          padding: '0 20px', gap: 12,
          borderBottom: '1px solid var(--color-border-muted)',
          background: 'var(--color-header-bg)',
        }}>
          <span dangerouslySetInnerHTML={{ __html: philLogoRaw }} style={{ display: 'inline-flex', height: 26 }} />
        </div>

        {/* Section label */}
        <div style={{ padding: '20px 20px 8px' }}>
          <span style={{ font: '700 10px var(--font-body)', letterSpacing: '.8px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
            Design Screens
          </span>
        </div>

        {/* Screen list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 20px' }}>
          {SCREENS.map((s) => {
            const active = s.id === activeScreen;
            return (
              <button key={s.id} onClick={() => { onSelect(s.id); onClose(); }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: active ? `color-mix(in srgb, ${s.accent} 8%, transparent)` : 'transparent',
                textAlign: 'left', transition: 'background 140ms ease', marginBottom: 2,
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--color-surface-muted)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Color dot */}
                <span style={{
                  width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                  background: s.accent,
                  opacity: active ? 1 : 0.4,
                }} />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontWeight: active ? 700 : 500,
                    fontSize: 13, lineHeight: '18px',
                    color: active ? s.accent : 'var(--color-text-default)',
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontWeight: 400,
                    fontSize: 11, lineHeight: '15px', color: 'var(--color-text-secondary)',
                    marginTop: 1,
                  }}>{s.sub}</div>
                </div>
                {active && (
                  <span style={{ marginLeft: 'auto', width: 3, height: 20, borderRadius: 2, background: s.accent, flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px 20px', borderTop: '1px solid var(--color-border-muted)' }}>
          <span style={{ font: '400 11px var(--font-body)', color: 'var(--color-text-secondary)' }}>
            PHIL Design System · v1.0
          </span>
        </div>
      </nav>
    </>
  );
}

// ── Placeholder screens (2–5) ─────────────────────────────────────
function PlaceholderScreen({ screen }) {
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 16,
      background: `color-mix(in srgb, ${screen.accent} 5%, var(--color-app-bg))`,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: `color-mix(in srgb, ${screen.accent} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: screen.accent, opacity: 0.8 }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0, font: '700 28px var(--font-display)', color: screen.accent }}>
          {screen.label}
        </h2>
        <p style={{ margin: '8px 0 0', font: '400 15px var(--font-body)', color: 'var(--color-text-secondary)' }}>
          {screen.sub}
        </p>
        <p style={{ margin: '20px 0 0', font: '400 13px var(--font-body)', color: 'var(--color-text-secondary)', opacity: 0.7 }}>
          Screen {screen.id} — coming soon
        </p>
      </div>
    </div>
  );
}

export default function PADashboard() {
  const [status, setStatus] = useState('none');
  const [feed, setFeed] = useState(SEED);
  const [tab, setTab] = useState('comments');
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState(1);

  const currentScreen = SCREENS.find(s => s.id === activeScreen);

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
      <SideNav
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
        activeScreen={activeScreen}
        onSelect={setActiveScreen}
      />
      <AppHeader
        logo={<span dangerouslySetInnerHTML={{ __html: philLogoRaw }} style={{ display: 'inline-flex', height: 32 }} />}
        onMenuClick={() => setSideNavOpen(v => !v)}
        style={{ position: 'sticky', top: 0, zIndex: 100 }}
      />

      {activeScreen === 1 ? (
        <div style={{ flex: 1, display: 'flex', minHeight: 0, width: '100%', maxWidth: 1392, margin: '0 auto' }}>
          <main style={{ flex: 1, minWidth: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
            <HeroPanel status={status} onStart={start} />
            <DetailRow />
            <MedRow />
          </main>
          <PAQueue feed={feed} onSend={send} tab={tab} setTab={setTab} />
        </div>
      ) : activeScreen === 2 ? (
        <StartPAFlow />
      ) : activeScreen === 3 ? (
        <CheckResultsFlow />
      ) : (
        <PlaceholderScreen screen={currentScreen} />
      )}
    </div>
  );
}
