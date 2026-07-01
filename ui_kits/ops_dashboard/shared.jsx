/* Shared components for PADashboard and StartPAFlow.
   Putting these here avoids circular imports. */
import React, { useState, useRef, useEffect } from 'react';
import editDocIconRaw   from '../../assets/Icons/edit-document.svg?raw';
import rotateIconRaw    from '../../assets/Icons/rotate.svg?raw';
import paQueueIconRaw   from '../../assets/Icons/PA_Queue_Icon.svg?raw';
import insuranceCardImg from '../../assets/images/insurance-card.png';
import { Card }        from '../../components/layout/Card.jsx';
import { KeyValue }    from '../../components/layout/KeyValue.jsx';
import { Tag }         from '../../components/core/Tag.jsx';
import { Button }      from '../../components/core/Button.jsx';
import { Icon }        from '../../components/core/Icon.jsx';
import { Select }      from '../../components/forms/Select.jsx';
import { CommentBox, CommentItem } from '../../components/feedback/CommentBox.jsx';

// ── Field styles (Figma exact) ────────────────────────────────────
export const FIELD_INPUT = {
  width: '100%', border: 'none', outline: 'none', background: 'transparent',
  fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14,
  lineHeight: '20px', color: 'var(--color-text-default)',
};
export const FIELD_BOX = {
  background: 'var(--color-surface-default)', border: '1px solid var(--color-border-muted)',
  borderRadius: 8, padding: '13px 17px', boxShadow: 'var(--shadow-xs)',
};
export const FIELD_LABEL = {
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
  lineHeight: '20px', color: 'var(--neutral-600)',
};

export function DrawerField({ label, value, onChange }) {
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

// ── Insurance card lightbox ───────────────────────────────────────
export function InsuranceCardModal({ open, onClose }) {
  const [zoom, setZoom]     = useState(1);
  const [rotate, setRotate] = useState(0);
  const [pos, setPos]       = useState({ x: 0, y: 0 });
  const stageRef   = useRef(null);
  const dragging   = useRef(false);
  const dragOrigin = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      setZoom((z) => +(Math.min(Math.max(z + delta, 0.25), 5)).toFixed(2));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  useEffect(() => {
    if (!open) { setZoom(1); setRotate(0); setPos({ x: 0, y: 0 }); }
  }, [open]);

  const zoomIn    = () => setZoom((z) => +(Math.min(z + 0.25, 5)).toFixed(2));
  const zoomOut   = () => setZoom((z) => +(Math.max(z - 0.25, 0.25)).toFixed(2));
  const rotateCw  = () => setRotate((r) => (r + 90) % 360);
  const rotateCcw = () => setRotate((r) => (r - 90 + 360) % 360);
  const reset     = () => { setZoom(1); setRotate(0); setPos({ x: 0, y: 0 }); };

  const onMouseDown = (e) => {
    e.preventDefault(); dragging.current = true;
    dragOrigin.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - dragOrigin.current.x, y: e.clientY - dragOrigin.current.y });
  };
  const onMouseUp = () => { dragging.current = false; };

  const CTRL_BTN = {
    width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'color-mix(in srgb, var(--neutral-0) 12%, transparent)',
    color: 'var(--color-text-inverse)', transition: 'background 150ms ease',
  };

  return (
    <div ref={stageRef} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', userSelect: 'none',
      }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'color-mix(in srgb, var(--neutral-1000) 85%, transparent)',
        backdropFilter: 'blur(6px)',
      }} />
      <div style={{
        position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(16px)',
        transition: open ? 'transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1)' : 'none',
      }}>
        <div onMouseDown={onMouseDown} style={{
          width: '80vw', height: '65vh', borderRadius: 12, overflow: 'hidden',
          boxShadow: `0 24px 64px color-mix(in srgb, var(--neutral-1000) 60%, transparent)`,
          cursor: dragging.current ? 'grabbing' : 'grab',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src={insuranceCardImg} alt="Insurance card" draggable={false}
            style={{
              display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', flexShrink: 0,
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom}) rotate(${rotate}deg)`,
              transition: dragging.current ? 'none' : 'transform 200ms ease',
              transformOrigin: 'center center',
            }} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'color-mix(in srgb, var(--neutral-0) 10%, transparent)',
          backdropFilter: 'blur(12px)',
          border: '1px solid color-mix(in srgb, var(--neutral-0) 15%, transparent)',
          borderRadius: 12, padding: '8px 14px',
        }}>
          <button style={CTRL_BTN} onClick={zoomOut}><Icon name="minus" size={16} color="var(--color-text-inverse)" /></button>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--color-text-inverse)', minWidth: 44, textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
          <button style={CTRL_BTN} onClick={zoomIn}><Icon name="plus" size={16} color="var(--color-text-inverse)" /></button>
          <div style={{ width: 1, height: 20, background: 'color-mix(in srgb, var(--neutral-0) 20%, transparent)', margin: '0 4px' }} />
          <button style={CTRL_BTN} onClick={rotateCcw}><span dangerouslySetInnerHTML={{ __html: rotateIconRaw }} style={{ display: 'inline-flex', width: 16, height: 16, transform: 'scaleX(-1)', filter: 'invert(1)' }} /></button>
          <button style={CTRL_BTN} onClick={rotateCw}><span dangerouslySetInnerHTML={{ __html: rotateIconRaw }} style={{ display: 'inline-flex', width: 16, height: 16, filter: 'invert(1)' }} /></button>
          <div style={{ width: 1, height: 20, background: 'color-mix(in srgb, var(--neutral-0) 20%, transparent)', margin: '0 4px' }} />
          <button style={{ ...CTRL_BTN, fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 600, width: 'auto', padding: '0 10px' }} onClick={reset}>Reset</button>
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'color-mix(in srgb, var(--neutral-0) 45%, transparent)' }}>Click outside to close</span>
      </div>
    </div>
  );
}

// ── Edit Insurance Drawer ─────────────────────────────────────────
export function EditInsuranceDrawer({ open, onClose }) {
  const [cardModal, setCardModal] = useState(false);
  const [form, setForm] = useState({
    carrier: 'United Healthcare CM', memberId: 'U88294022',
    groupId: 'NYFED-02', bin: '610014', pcn: 'MEDDPRIME', type: 'Commercial',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--neutral-1000) 30%, transparent)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', zIndex: 200,
      }} />
      <InsuranceCardModal open={cardModal} onClose={() => setCardModal(false)} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 397,
        background: 'var(--color-sidebar-bg)', zIndex: 201, overflowY: 'auto',
        boxShadow: `-4px 0 24px color-mix(in srgb, var(--neutral-1000) 12%, transparent)`,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', paddingTop: 24,
      }}>
        <div style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0, background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span dangerouslySetInnerHTML={{ __html: editDocIconRaw }} style={{ display: 'inline-flex', width: 20, height: 20 }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--color-text-default)' }}>Edit Insurance</div>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div onClick={() => setCardModal(true)} style={{ height: 226, width: '100%', overflow: 'hidden', position: 'relative', background: 'color-mix(in srgb, var(--neutral-400) 20%, transparent)', cursor: 'zoom-in' }}>
              <img src={insuranceCardImg} alt="Insurance card"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 200ms ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DrawerField label="Primary Carrier" value={form.carrier} onChange={set('carrier')} />
            <DrawerField label="Member ID"       value={form.memberId} onChange={set('memberId')} />
            <DrawerField label="Group ID"        value={form.groupId}  onChange={set('groupId')} />
            <DrawerField label="BIN"             value={form.bin}      onChange={set('bin')} />
            <DrawerField label="PCN"             value={form.pcn}      onChange={set('pcn')} />
            <div style={{ paddingBottom: 24 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={FIELD_LABEL}>Type</span>
                <div style={{ ...FIELD_BOX, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <select value={form.type} onChange={set('type')} style={{ ...FIELD_INPUT, appearance: 'none', cursor: 'pointer' }}>
                    {['Commercial', 'Medicare Part D', 'Medicaid', 'Tricare'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <Icon name="chevron-down" size={16} color="var(--neutral-600)" style={{ flexShrink: 0, pointerEvents: 'none' }} />
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8, paddingBottom: 32 }}>
            <Button intent="primary" size="lg" fullWidth onClick={onClose}>Save</Button>
            <Button intent="link" size="lg" onClick={onClose} style={{ alignSelf: 'center', color: 'var(--neutral-700)' }}>Close</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Edit Patient Drawer ───────────────────────────────────────────
export function EditPatientDrawer({ open, onClose }) {
  const [form, setForm] = useState({
    name: 'Patricia Tuladhar', dob: '02/18/1978',
    allergies: 'Cetirizine', address: '1294 Evergreen Terrace, Apt 4B\nNew York, NY 10012',
  });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--neutral-1000) 30%, transparent)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', zIndex: 200,
      }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 397,
        background: 'var(--color-sidebar-bg)', zIndex: 201, overflowY: 'auto',
        boxShadow: `-4px 0 24px color-mix(in srgb, var(--neutral-1000) 12%, transparent)`,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', paddingTop: 24,
      }}>
        <div style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0, background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="user" size={20} color="#fff" />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--color-text-default)' }}>Edit Patient</div>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DrawerField label="Legal Name"    value={form.name}      onChange={set('name')} />
            <DrawerField label="Date of Birth" value={form.dob}       onChange={set('dob')} />
            <DrawerField label="Allergies"     value={form.allergies}  onChange={set('allergies')} />
            <DrawerField label="Address"       value={form.address}   onChange={set('address')} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8, paddingBottom: 32 }}>
            <Button intent="primary" size="lg" fullWidth onClick={onClose}>Save</Button>
            <Button intent="link" size="lg" onClick={onClose} style={{ alignSelf: 'center', color: 'var(--neutral-700)' }}>Close</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Edit Doctor Drawer ────────────────────────────────────────────
export function EditDoctorDrawer({ open, onClose }) {
  const [form, setForm] = useState({
    name: 'Dr. Marc James', practice: 'Skin Expert MD',
    phone: '(212) 555-0192', fax: '(212) 555-0193', npi: '1942820011',
  });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--neutral-1000) 30%, transparent)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', zIndex: 200,
      }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 397,
        background: 'var(--color-sidebar-bg)', zIndex: 201, overflowY: 'auto',
        boxShadow: `-4px 0 24px color-mix(in srgb, var(--neutral-1000) 12%, transparent)`,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', paddingTop: 24,
      }}>
        <div style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0, background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="building" size={20} color="#fff" />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--color-text-default)' }}>Edit Doctor</div>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DrawerField label="Full Name"     value={form.name}     onChange={set('name')} />
            <DrawerField label="Practice Name" value={form.practice} onChange={set('practice')} />
            <DrawerField label="Phone"         value={form.phone}    onChange={set('phone')} />
            <DrawerField label="Fax"           value={form.fax}      onChange={set('fax')} />
            <DrawerField label="NPI Number"    value={form.npi}      onChange={set('npi')} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8, paddingBottom: 32 }}>
            <Button intent="primary" size="lg" fullWidth onClick={onClose}>Save</Button>
            <Button intent="link" size="lg" onClick={onClose} style={{ alignSelf: 'center', color: 'var(--neutral-700)' }}>Close</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Detail cards row (identical in both pages) ────────────────────
export function DetailRow() {
  const [patientEditOpen,   setPatientEditOpen]   = useState(false);
  const [insuranceEditOpen, setInsuranceEditOpen] = useState(false);
  const [doctorEditOpen,    setDoctorEditOpen]    = useState(false);

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
          <Button intent="link" size="sm" onClick={() => setPatientEditOpen(true)} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
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
          <Button intent="link" size="sm" onClick={() => setDoctorEditOpen(true)} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>
      </div>

      <EditPatientDrawer   open={patientEditOpen}   onClose={() => setPatientEditOpen(false)} />
      <EditInsuranceDrawer open={insuranceEditOpen} onClose={() => setInsuranceEditOpen(false)} />
      <EditDoctorDrawer    open={doctorEditOpen}    onClose={() => setDoctorEditOpen(false)} />
    </>
  );
}

// ── PA Queue — shared across Start PA and Check Results flows ─────

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

const PA_QUEUE_FEED = [
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

export function PAQueue() {
  const [tab, setTab]   = useState('comments');
  const [feed, setFeed] = useState(PA_QUEUE_FEED);
  const send = (text) => setFeed(f => [{ t: text, m: 'Today · You (PA Agent)' }, ...f]);

  return (
    <aside style={{ width: 'var(--sidebar-width)', flexShrink: 0, backgroundColor: 'var(--color-sidebar-bg)', borderLeft: '1px solid var(--color-border-muted)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
            <span style={{ font: '400 12px var(--font-body)', color: 'var(--color-text-secondary)' }}>First fill</span>
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
        }}>
          <SOPList />
        </div>
      </div>
    </aside>
  );
}

// ── Medication row — shared source of truth across all pages ──────
export function MedRow() {
  const SUB = 'var(--color-text-secondary)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
      <Card
        title="Medication Information"
        action={<Button intent="link" size="md">Edit</Button>}
        onCopy={() => {}}
      >
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
