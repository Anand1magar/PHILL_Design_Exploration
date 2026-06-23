/* @ds-bundle: {"format":3,"namespace":"PHILDesignSystem_bffd2d","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"CommentBox","sourcePath":"components/feedback/CommentBox.jsx"},{"name":"CommentItem","sourcePath":"components/feedback/CommentBox.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"FileUpload","sourcePath":"components/forms/FileUpload.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Avatar","sourcePath":"components/layout/Avatar.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"KeyValue","sourcePath":"components/layout/KeyValue.jsx"},{"name":"AppHeader","sourcePath":"components/navigation/AppHeader.jsx"}],"sourceHashes":{"components/core/Button.jsx":"d87b90899b20","components/core/Icon.jsx":"8f4a8a47575d","components/core/StatusPill.jsx":"23a210899eaf","components/core/Tag.jsx":"f34b48ef57ac","components/feedback/Alert.jsx":"5f98f0974df4","components/feedback/CommentBox.jsx":"0cce2af12ca5","components/feedback/ProgressBar.jsx":"24454fcf2a91","components/forms/FileUpload.jsx":"2ff6cc244482","components/forms/Input.jsx":"5e03b038615e","components/forms/Radio.jsx":"7ac632254eee","components/forms/Select.jsx":"70bb5db90fb6","components/layout/Avatar.jsx":"c42db6e15cc4","components/layout/Card.jsx":"aab11d4b47ba","components/layout/KeyValue.jsx":"ea818efa4934","components/navigation/AppHeader.jsx":"0f539694f136","ui_kits/ops_dashboard/PADashboard.jsx":"9ebcd7b4756b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PHILDesignSystem_bffd2d = window.PHILDesignSystem_bffd2d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * PHIL Button — primary action control.
 * Faithful to the Figma Button set: radius 8, Lato 700, three sizes, five intents.
 */
const SIZES = {
  sm: {
    height: 32,
    padding: '0 12px',
    fontSize: 12,
    gap: 8,
    iconSize: 14
  },
  md: {
    height: 40,
    padding: '0 16px',
    fontSize: 14,
    gap: 8,
    iconSize: 16
  },
  lg: {
    height: 48,
    padding: '0 20px',
    fontSize: 16,
    gap: 8,
    iconSize: 18
  }
};
const INTENTS = {
  primary: {
    base: 'var(--color-button-primary-default)',
    hover: 'var(--color-button-primary-hover)',
    pressed: 'var(--color-button-primary-pressed)',
    text: 'var(--color-button-primary-text)',
    border: null,
    disabledOpacity: 0.6
  },
  secondary: {
    base: 'var(--color-button-secondary-default)',
    hover: 'var(--color-button-secondary-hover)',
    pressed: 'var(--color-button-secondary-pressed)',
    text: 'var(--color-button-secondary-text)',
    border: 'var(--color-button-secondary-border)',
    disabledOpacity: 0.5
  },
  success: {
    base: 'var(--color-button-success-primary-bg)',
    hover: 'var(--color-button-success-primary-bg)',
    pressed: 'var(--color-button-success-primary-bg)',
    text: 'var(--color-button-success-text)',
    border: null,
    disabledOpacity: 0.6
  },
  positive: {
    base: 'var(--color-button-positive-secondary-bg)',
    hover: 'var(--color-button-positive-secondary-bg)',
    pressed: 'var(--color-button-positive-secondary-bg)',
    text: 'var(--color-button-positive-secondary-text)',
    border: 'var(--color-button-positive-secondary-border)',
    disabledOpacity: 0.5
  },
  negative: {
    base: 'var(--color-button-negative-primary-bg)',
    hover: 'var(--color-button-negative-primary-bg)',
    pressed: 'var(--color-button-negative-primary-bg)',
    text: 'var(--color-button-negative-text)',
    border: null,
    disabledOpacity: 0.6
  },
  link: {
    base: 'transparent',
    hover: 'transparent',
    pressed: 'transparent',
    text: 'var(--color-text-link)',
    border: null,
    disabledOpacity: 0.4,
    underlineOnHover: true,
    weight: 'var(--weight-semibold)'
  }
};
function Button({
  children,
  intent = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  style = {},
  onClick,
  type = 'button',
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const c = INTENTS[intent] || INTENTS.primary;
  const bg = disabled ? c.base : active ? c.pressed : hover ? c.hover : c.base;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      height: c.underlineOnHover ? 'auto' : s.height,
      padding: c.underlineOnHover ? 0 : s.padding,
      width: fullWidth ? '100%' : 'auto',
      display: 'inline-flex',
      flexDirection: 'row',
      gap: s.gap,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: c.underlineOnHover ? 0 : 'var(--radius-md)',
      backgroundColor: bg,
      color: c.text,
      border: 'none',
      boxShadow: c.border ? `inset 0 0 0 1px ${c.border}` : 'none',
      fontFamily: 'var(--font-body)',
      fontWeight: c.weight || 'var(--weight-bold)',
      fontSize: s.fontSize,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      textDecoration: c.underlineOnHover && hover ? 'underline' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? c.disabledOpacity : 1,
      transition: 'opacity 120ms ease',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.iconSize,
      height: s.iconSize
    }
  }, icon) : null, children != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0
    }
  }, children) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.iconSize,
      height: s.iconSize
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL icon set — 24×24 line icons, 2px stroke, currentColor.
 * Curated to cover the prior-auth ops surfaces (Lucide-style geometry).
 */
const PATHS = {
  'chevron-down': /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }),
  'chevron-right': /*#__PURE__*/React.createElement("polyline", {
    points: "9 6 15 12 9 18"
  }),
  'chevron-left': /*#__PURE__*/React.createElement("polyline", {
    points: "15 6 9 12 15 18"
  }),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "13",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
  })),
  'shield-check': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 12 11 14 15 10"
  })),
  'cloud-upload': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 13v8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8 17 4-4 4 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"
  })),
  info: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8h.01"
  })),
  'circle-help': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17h.01"
  })),
  'arrow-up-right': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M7 7h10v10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 17 17 7"
  })),
  'external-link': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M15 3h6v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14 21 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  })),
  comment: /*#__PURE__*/React.createElement("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }),
  'message-square': /*#__PURE__*/React.createElement("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  }),
  moon: /*#__PURE__*/React.createElement("path", {
    d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"
  }),
  send: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m22 2-7 20-4-9-9-4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 2 11 13"
  })),
  'check-circle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 12 11 14 15 10"
  })),
  check: /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }),
  x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  })),
  edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"
  })),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"
  }),
  file: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  'list-checks': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m3 17 2 2 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 7 2 2 4-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 6h8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 12h8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 18h8"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  'alert-circle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16h.01"
  })),
  pill: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8.5 8.5 7 7"
  })),
  building: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "2",
    width: "16",
    height: "20",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 22v-4h6v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"
  })),
  phone: /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
  })
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {},
  ...rest
}) {
  const path = PATHS[name];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'inline-block',
      flexShrink: 0,
      ...style
    },
    "aria-hidden": "true"
  }, rest), path || null);
}
const ICON_NAMES = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PAStatusPill — prior-authorization status indicator.
 * Pill with a colored dot + uppercase Lato 800 label. Mirrors the Figma PAStatusPill set.
 */
const STATUS = {
  pending: {
    bg: 'rgba(35,99,195,0.07)',
    fg: 'var(--blue-600)',
    label: 'PA Pending'
  },
  approved: {
    bg: 'rgba(16,185,129,0.07)',
    fg: 'var(--teal-300)',
    label: 'PA Approved'
  },
  denied: {
    bg: 'rgba(208,2,27,0.07)',
    fg: 'var(--red-900)',
    label: 'PA Denied'
  },
  expired: {
    bg: 'rgba(184,92,0,0.08)',
    fg: 'var(--amber-600)',
    label: 'PA Expired'
  },
  cancelled: {
    bg: 'var(--neutral-100)',
    fg: 'var(--neutral-500)',
    label: 'PA Cancelled'
  }
};
function StatusPill({
  status = 'pending',
  children,
  style = {},
  ...rest
}) {
  const c = STATUS[status] || STATUS.pending;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignSelf: 'flex-start',
      width: 'fit-content',
      maxWidth: '100%',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderRadius: 'var(--radius-pill)',
      backgroundColor: c.bg,
      color: c.fg,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-extrabold)',
      fontSize: 12,
      lineHeight: 1,
      letterSpacing: '0.2px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: c.fg,
      flexShrink: 0
    }
  }), children ?? c.label);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL Tag / chip. Soft or outlined, six semantic colors, optional icon and stat count.
 * Matches the Figma "Tag" family: radius 4, Lato 700, 10px (sm) / 12px (lg).
 */
const COLORS = {
  blue: {
    soft: 'var(--blue-100)',
    fg: 'var(--blue-600)',
    border: 'var(--blue-300)'
  },
  gray: {
    soft: 'var(--neutral-100)',
    fg: 'var(--neutral-600)',
    border: 'var(--neutral-300)'
  },
  green: {
    soft: 'var(--green-100)',
    fg: 'var(--green-800)',
    border: 'var(--green-200)'
  },
  orange: {
    soft: 'var(--amber-100)',
    fg: 'var(--amber-600)',
    border: 'var(--amber-400)'
  },
  purple: {
    soft: 'var(--purple-100)',
    fg: 'var(--purple-600)',
    border: 'var(--purple-400)'
  },
  red: {
    soft: 'var(--red-200)',
    fg: 'var(--red-500)',
    border: 'var(--red-300)'
  }
};
const SIZES = {
  sm: {
    fontSize: 10,
    padding: '4px 8px',
    gap: 4,
    iconSize: 10,
    height: 21
  },
  lg: {
    fontSize: 12,
    padding: '5px 10px',
    gap: 6,
    iconSize: 13,
    height: 26
  }
};
function Tag({
  children,
  color = 'gray',
  variant = 'solid',
  size = 'sm',
  icon = null,
  iconRight = null,
  stat = null,
  style = {},
  ...rest
}) {
  const c = COLORS[color] || COLORS.gray;
  const s = SIZES[size] || SIZES.sm;
  const outlined = variant === 'outlined';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignSelf: 'flex-start',
      width: 'fit-content',
      maxWidth: '100%',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      borderRadius: 'var(--radius-xs)',
      backgroundColor: outlined ? 'transparent' : c.soft,
      color: c.fg,
      boxShadow: outlined ? `inset 0 0 0 1px ${c.border}` : 'none',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: s.fontSize,
      lineHeight: 1,
      letterSpacing: '0.2px',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.iconSize,
      height: s.iconSize
    }
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, children), stat != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 2,
      padding: '0 5px',
      borderRadius: 'var(--radius-pill)',
      backgroundColor: outlined ? c.soft : 'rgba(255,255,255,0.6)',
      fontSize: s.fontSize,
      fontWeight: 'var(--weight-extrabold)'
    }
  }, stat) : null, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.iconSize,
      height: s.iconSize
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL Alert — the labeled exception/notice block (e.g. "CLAIM REJECTED").
 * Uppercase eyebrow above a bordered white card: a colored code + right-aligned source, then body copy.
 */
const TONES = {
  red: {
    code: 'var(--red-800)',
    eyebrow: 'var(--color-text-secondary)'
  },
  blue: {
    code: 'var(--blue-600)',
    eyebrow: 'var(--color-text-secondary)'
  },
  green: {
    code: 'var(--green-800)',
    eyebrow: 'var(--color-text-secondary)'
  },
  amber: {
    code: 'var(--amber-600)',
    eyebrow: 'var(--color-text-secondary)'
  }
};
function Alert({
  eyebrow,
  code,
  source,
  children,
  tone = 'red',
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.red;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: t.eyebrow
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 16,
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--color-surface-default)',
      boxShadow: 'inset 0 0 0 1px var(--color-border-muted)'
    }
  }, code || source ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 14,
      lineHeight: '20px',
      color: t.code
    }
  }, code), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-default)',
      textAlign: 'right'
    }
  }, source)) : null, children ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--neutral-900)'
    }
  }, children) : null));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CommentBox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * PHIL CommentBox — the PA Queue comment composer.
 * White rounded field with an inline blue send button (bottom-right).
 */
function CommentBox({
  placeholder = 'Type your comment here.',
  value,
  onChange,
  onSend,
  disabled = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = useState('');
  const controlled = value != null;
  const val = controlled ? value : internal;
  const setVal = v => {
    if (!controlled) setInternal(v);
    onChange && onChange(v);
  };
  const canSend = !disabled && String(val).trim().length > 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--color-surface-default)',
      boxShadow: 'inset 0 0 0 1px var(--color-border-muted)',
      padding: 12,
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("textarea", {
    value: val,
    placeholder: placeholder,
    disabled: disabled,
    onChange: e => setVal(e.target.value),
    rows: 3,
    style: {
      width: '100%',
      border: 'none',
      outline: 'none',
      resize: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-default)',
      backgroundColor: 'transparent',
      paddingRight: 36,
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (canSend) {
        onSend && onSend(val);
        setVal('');
      }
    },
    "aria-label": "Send comment",
    disabled: !canSend,
    style: {
      position: 'absolute',
      right: 12,
      bottom: 12,
      width: 28,
      height: 28,
      borderRadius: '50%',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: canSend ? 'var(--blue-100)' : 'var(--neutral-100)',
      color: canSend ? 'var(--blue-600)' : 'var(--neutral-400)',
      cursor: canSend ? 'pointer' : 'default',
      transition: 'all 120ms ease'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "send",
    size: 15
  })));
}

/**
 * PHIL CommentItem — a single PA Queue activity-log entry: body text + timestamp/author meta.
 */
function CommentItem({
  children,
  meta,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'var(--color-surface-default)',
      boxShadow: 'var(--shadow-card)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-default)'
    }
  }, children), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 12,
      lineHeight: '16px',
      color: 'var(--color-text-secondary)'
    }
  }, meta) : null);
}
Object.assign(__ds_scope, { CommentBox, CommentItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CommentBox.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL ProgressBar — the prior-auth SLA tracker card.
 * Soft-blue panel, a glassy pill track with an inset progress fill, and remaining / business-day labels.
 */
const TONES = {
  blue: {
    panel: 'rgba(35,99,195,0.10)',
    fill: 'var(--blue-600)',
    accent: 'var(--blue-600)',
    ring: 'rgba(35,99,195,0.1)'
  },
  green: {
    panel: 'rgba(5,150,105,0.10)',
    fill: 'var(--green-600)',
    accent: 'var(--green-800)',
    ring: 'rgba(5,150,105,0.12)'
  },
  amber: {
    panel: 'rgba(184,92,0,0.08)',
    fill: 'var(--amber-600)',
    accent: 'var(--amber-600)',
    ring: 'rgba(184,92,0,0.12)'
  }
};
function ProgressBar({
  value = 40,
  remainingLabel = '3 days remaining',
  dayLabel = 'DAY 2 OF 5 BUSINESS DAYS',
  initiatedOn = null,
  tone = 'blue',
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.blue;
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 12,
      borderRadius: 'var(--radius-xl)',
      backgroundColor: t.panel,
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 12,
      lineHeight: '20px',
      color: t.accent
    }
  }, remainingLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 10,
      lineHeight: '18px',
      color: 'var(--color-text-default)',
      letterSpacing: '0.3px'
    }
  }, dayLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 6,
      borderRadius: 'var(--radius-pill)',
      backgroundColor: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(8px)',
      boxShadow: `inset 0 0 0 1px ${t.ring}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 12,
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      backgroundColor: 'rgb(241,245,249)',
      boxShadow: 'var(--shadow-progress-track)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--radius-pill)',
      backgroundColor: t.fill,
      transition: 'width 240ms ease'
    }
  }))), initiatedOn ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 10,
      lineHeight: '20px',
      color: 'var(--neutral-700)'
    }
  }, "Initiated on: ", initiatedOn) : null);
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileUpload.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * PHIL FileUpload — dashed dropzone. Cloud icon in a soft blue circle, prompt copy, Select File button.
 * Mirrors the Figma FileUpload set (default / hover / drag-over states via `state`).
 */
const STATE_STYLES = {
  default: {
    outline: '2px dashed var(--blue-300)',
    bg: 'var(--color-surface-default)'
  },
  hover: {
    outline: '2px dashed var(--blue-400)',
    bg: 'var(--blue-50)'
  },
  dragover: {
    outline: '2px dashed var(--blue-500)',
    bg: 'var(--blue-100)'
  },
  error: {
    outline: '2px dashed var(--red-300)',
    bg: 'var(--red-50)'
  },
  success: {
    outline: '2px dashed var(--green-200)',
    bg: 'var(--green-50)'
  }
};
function FileUpload({
  label,
  title = 'Click or drag file to this area to upload',
  hint = 'Supports single or bulk upload.',
  state,
  onSelect,
  style = {},
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const active = state || (hovered ? 'hover' : 'default');
  const s = STATE_STYLES[active] || STATE_STYLES.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 14,
      color: 'var(--neutral-400)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: 'center',
      padding: 32,
      borderRadius: 'var(--radius-xl)',
      backgroundColor: s.bg,
      outline: s.outline,
      outlineOffset: -2,
      transition: 'background-color 120ms ease, outline-color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      backgroundColor: 'var(--blue-50)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--blue-600)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "cloud-upload",
    size: 32,
    strokeWidth: 1.75
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--neutral-800)',
      textAlign: 'center'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--neutral-400)',
      textAlign: 'center'
    }
  }, hint))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    intent: "primary",
    size: "md",
    onClick: onSelect
  }, "Select File")));
}
Object.assign(__ds_scope, { FileUpload });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileUpload.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * PHIL Input — labeled text field. White box, radius 8, inset hairline border,
 * blue focus ring, red error state. Label is Lato 700.
 */
function Input({
  label,
  placeholder = '',
  value,
  defaultValue,
  onChange,
  error = false,
  disabled = false,
  type = 'text',
  id,
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? 'var(--color-text-danger)' : focused ? 'var(--color-button-primary-default)' : 'var(--color-border-muted)';
  const ring = focused && !error ? ', 0 0 0 3px rgba(35,99,195,0.12)' : '';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-secondary)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      height: 46,
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      backgroundColor: disabled ? 'var(--color-surface-muted)' : 'var(--color-surface-default)',
      border: 'none',
      boxShadow: `inset 0 0 0 1px ${borderColor}, var(--shadow-xs)${ring}`,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-default)',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      transition: 'box-shadow 120ms ease',
      ...inputStyle
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL Radio — single-select control. Blue filled ring when checked, gray ring when not.
 */
function Radio({
  label,
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  id,
  style = {},
  ...rest
}) {
  const ringColor = checked ? 'var(--color-button-primary-default)' : 'var(--color-border-strong)';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      boxShadow: `inset 0 0 0 2px ${ringColor}`,
      backgroundColor: 'var(--color-surface-default)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'box-shadow 120ms ease'
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: 'var(--color-button-primary-default)'
    }
  }) : null), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-default)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * PHIL Select — labeled dropdown trigger. Same box as Input with a trailing chevron.
 * Lightweight (renders a styled native menu); placeholder text is muted.
 */
function Select({
  label,
  placeholder = 'Select option',
  value,
  onChange,
  options = [],
  disabled = false,
  error = false,
  id,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? 'var(--color-text-danger)' : focused ? 'var(--color-button-primary-default)' : 'var(--color-border-muted)';
  const ring = focused && !error ? ', 0 0 0 3px rgba(35,99,195,0.12)' : '';
  const empty = value == null || value === '';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 14,
      lineHeight: '20px',
      color: 'var(--color-text-secondary)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    value: value ?? '',
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      height: 46,
      padding: '12px 40px 12px 16px',
      borderRadius: 'var(--radius-md)',
      backgroundColor: disabled ? 'var(--color-surface-muted)' : 'var(--color-surface-default)',
      border: 'none',
      boxShadow: `inset 0 0 0 1px ${borderColor}, var(--shadow-xs)${ring}`,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-regular)',
      fontSize: 14,
      lineHeight: '20px',
      color: empty ? 'var(--neutral-400)' : 'var(--color-text-default)',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      appearance: 'none',
      WebkitAppearance: 'none',
      transition: 'box-shadow 120ms ease'
    }
  }, rest), /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true,
    hidden: true
  }, placeholder), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--color-text-secondary)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/layout/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL Avatar — teal identity circle. Shows initials, an icon, or the PHIL mark.
 */
function Avatar({
  initials,
  icon,
  size = 36,
  color = 'var(--color-brand)',
  textColor = 'var(--neutral-0)',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      color: textColor,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      fontSize: Math.round(size * 0.4),
      flexShrink: 0,
      boxSizing: 'border-box',
      ...style
    }
  }, rest), icon || (initials ? initials.slice(0, 2).toUpperCase() : 'P'));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL Card — the white surface that holds patient/insurance/medication detail.
 * Radius 16, inset hairline border + soft drop shadow. Optional title row with a copy action.
 */
function Card({
  children,
  title,
  action,
  onCopy,
  padding = 24,
  style = {},
  bodyStyle = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding,
      borderRadius: 'var(--radius-xl)',
      backgroundColor: 'var(--color-surface-default)',
      boxShadow: 'var(--shadow-card)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), title || action || onCopy ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 18,
      lineHeight: '28px',
      color: 'var(--color-text-default)'
    }
  }, title) : /*#__PURE__*/React.createElement("span", null), action || (onCopy ? /*#__PURE__*/React.createElement("button", {
    onClick: onCopy,
    "aria-label": "Copy",
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      padding: 0,
      color: 'var(--teal-100)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "copy",
    size: 18
  })) : null)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/KeyValue.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL KeyValue — the labeled data row used throughout the detail cards.
 * Uppercase micro-label (Lato 700, tight tracking) over a medium-weight value.
 */
const __KV_LABEL = {
  fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',
  fontSize: 10, lineHeight: '15px', letterSpacing: 'var(--tracking-tight)',
  textTransform: 'uppercase', color: 'var(--color-text-secondary)',
};
const __KV_VALUE = {
  default: { fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-medium)', fontSize: 14, lineHeight: '20px', color: 'var(--color-text-default)', whiteSpace: 'pre-line' },
  title:   { fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)',   fontSize: 16, lineHeight: '24px', color: 'var(--color-brand)',         whiteSpace: 'pre-line' },
  link:    { fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-medium)', fontSize: 14, lineHeight: '20px', color: 'var(--color-text-link)', textDecoration: 'underline', textUnderlinePosition: 'from-font', textDecorationSkipInk: 'none', whiteSpace: 'pre-line' },
};
function KeyValue({
  label, value, children, variant = 'default', valueColor, style = {}, ...rest
}) {
  const valueStyle = { ...(__KV_VALUE[variant] || __KV_VALUE.default), ...(valueColor ? { color: valueColor } : {}) };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: { display: 'flex', flexDirection: 'column', gap: 2, ...style }
  }, rest),
    /*#__PURE__*/React.createElement("span", { style: __KV_LABEL }, label),
    /*#__PURE__*/React.createElement("span", { style: valueStyle }, children ?? value)
  );
}
Object.assign(__ds_scope, { KeyValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/KeyValue.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AppHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PHIL AppHeader — the product top bar. Teal brand band by default (as shown in the Ops Dashboard),
 * white PHIL wordmark on the left, pill actions + avatar on the right. A `light` theme is available.
 */
function AppHeader({
  actions = [{
    icon: 'moon',
    label: 'Sleep Order'
  }, {
    icon: 'comment',
    label: 'Order Insights'
  }],
  user = { initials: 'P' },
  theme = 'brand',
  logo = 'PHIL',
  style = {},
  ...rest
}) {
  const brand = theme === 'brand';
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      height: 'var(--header-height)',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: brand ? 'var(--color-header-bg)' : 'var(--color-surface-default)',
      borderBottom: brand ? '1px solid rgba(0,0,0,0.08)' : 'var(--border-hairline)',
      ...style
    }
  }, rest),
  /* Centered inner content — Figma 1316px max-width centered frame */
  /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1316, margin: '0 auto', height: '100%', padding: '0 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box',
    }
  },
  /* Wordmark */
  /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)', fontWeight: 'var(--weight-extrabold)',
      fontSize: 26, letterSpacing: '0.5px',
      color: brand ? 'var(--neutral-0)' : 'var(--color-text-default)',
    }
  }, logo),
  /* Right: pills + avatar */
  /*#__PURE__*/React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', gap: 40 }
  },
  /* Action pills — Figma: light #F5F7F6 bg + #E6E6E6 border + black text */
  /*#__PURE__*/React.createElement("div", {
    style: { display: 'flex', alignItems: 'center', gap: 8 }
  }, actions.map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: a.onClick,
    style: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      height: 38, padding: '9px 13px', borderRadius: 'var(--radius-lg)',
      backgroundColor: brand ? 'rgb(245,247,246)' : 'var(--color-surface-secondary)',
      color: 'var(--neutral-1000)',
      border: '1px solid #e6e6e6',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-bold)', fontSize: 14, lineHeight: '20px',
      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 120ms ease',
    }
  }, a.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, { name: a.icon, size: 18, color: 'var(--neutral-900)' }) : null, a.label))),
  /* Avatar — white bg, teal initials per Figma */
  /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: user.initials, size: 36,
    color: 'var(--neutral-0)',
    textColor: 'var(--color-brand)',
  }))));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AppHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ops_dashboard/PADashboard.jsx
try { (() => {
/* PHIL Ops — Prior Authorization Dashboard.
   A faithful, interactive recreation of the main ops console, composed from the PHIL DS components.
   Exposes window.PADashboard. */
(function () {
  const NS = window.PHILDesignSystem_bffd2d;
  const {
    AppHeader,
    Card,
    KeyValue,
    Tag,
    StatusPill,
    Alert,
    Button,
    Select,
    Radio,
    ProgressBar,
    CommentBox,
    CommentItem,
    Avatar,
    Icon
  } = NS;
  const {
    useState
  } = React;
  const PALETTE = {
    appBg: 'var(--color-app-bg)',
    ink: 'var(--color-text-default)',
    sub: 'var(--color-text-secondary)'
  };

  // ── Hero: Start PA panel ──────────────────────────────────────────
  function HeroPanel({
    status,
    onStart
  }) {
    const [provider, setProvider] = useState('United Healthcare CM');
    const [paType, setPaType] = useState('');
    const ready = provider && paType && status === 'none';
    return /*#__PURE__*/React.createElement(Card, {
      padding: 0,
      style: {
        overflow: 'hidden'
      },
      bodyStyle: {
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        alignItems: 'stretch'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      color: "blue",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "shield-check",
        size: 11
      })
    }, "START PA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        font: '700 28px var(--font-body)',
        color: 'var(--color-brand)'
      }
    }, "Patricia Tuladhar"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        color: PALETTE.sub,
        font: '400 15px var(--font-body)'
      }
    }, "Date of Birth: 02/18/1978"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 2,
        color: PALETTE.sub,
        font: '400 15px var(--font-body)'
      }
    }, "Order Number: 1853-6203-7047"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        font: '700 14px var(--font-body)',
        color: PALETTE.ink
      }
    }, "PhilRx AZ")), /*#__PURE__*/React.createElement(Alert, {
      eyebrow: "Claim Rejected",
      code: "Code: 75",
      source: "Albertson Pharmacy",
      tone: "red"
    }, "Insurance exception reported by PP. Reason code: 75 - Prior Authorization Required."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 12px var(--font-body)',
        letterSpacing: '.6px',
        textTransform: 'uppercase',
        color: PALETTE.sub
      }
    }, "Previous Prior Authorizations"), /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'inset 0 0 0 1px var(--color-border-muted)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: "approved"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "CMM Key",
      value: "1201011 \u2197",
      valueColor: "var(--color-text-link)"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Member ID",
      value: "W72057801200"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Created",
      value: "03/20/2020"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Expired",
      value: "03/20/2021"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 32,
        backgroundColor: 'var(--blue-50)',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        justifyContent: 'flex-start'
      }
    }, status === 'pending' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      status: "pending"
    }), /*#__PURE__*/React.createElement(ProgressBar, {
      value: 20,
      remainingLabel: "5 days remaining",
      dayLabel: "DAY 1 OF 5 BUSINESS DAYS",
      initiatedOn: "06/20/2026",
      style: {
        width: '100%'
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: '400 14px var(--font-body)',
        color: PALETTE.sub
      }
    }, "Prior authorization submitted to ", provider, ". We'll post callbacks to the PA Queue as they arrive.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
      label: "Select Insurance Provider",
      value: provider,
      onChange: e => setProvider(e.target.value),
      options: ['United Healthcare CM', 'Aetna', 'Cigna', 'Medicare Part D Express Scripts']
    }), /*#__PURE__*/React.createElement(Select, {
      label: "Prior Authorization Type",
      value: paType,
      onChange: e => setPaType(e.target.value),
      placeholder: "Select Prior Authorization Type",
      options: ['Standard', 'Urgent / Expedited', 'Appeal', 'Step Therapy Override']
    }), /*#__PURE__*/React.createElement(Button, {
      intent: "primary",
      size: "lg",
      fullWidth: true,
      disabled: !ready,
      onClick: () => onStart(provider),
      style: {
        marginTop: 8
      }
    }, "Start Prior Authorization"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        textAlign: 'center',
        font: '700 16px var(--font-body)',
        color: 'var(--color-text-link)',
        textDecoration: 'none'
      }
    }, "Already Submitted in CoverMyMeds")))));
  }

  // ── Detail cards row ──────────────────────────────────────────────
  function DetailRow() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Patient Profile",
      onCopy: () => {}
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "Legal Name",
      value: "Patricia Tuladhar"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "Allergies",
      value: "Cetirizine",
      valueColor: "var(--color-text-danger)"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "DOB",
      value: "02/18/1978"
    })), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Address",
      value: "1294 Evergreen Terrace, Apt 4B\nNew York, NY 10012"
    }), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        font: '400 14px var(--font-body)',
        color: 'var(--color-text-link)',
        textDecoration: 'none'
      }
    }, "EDIT")), /*#__PURE__*/React.createElement(Card, {
      title: "Insurance Details (1)",
      onCopy: () => {}
    }, /*#__PURE__*/React.createElement(Tag, {
      color: "blue"
    }, "Primary Insurance"), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Primary Carrier",
      value: "United Healthcare CM"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "Member ID",
      value: "U88294022"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Group",
      value: "NYFED-02"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "BIN",
      value: "610014"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "PCN",
      value: "MEDDPRIME"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Type",
      value: "Commercial"
    })), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        font: '400 14px var(--font-body)',
        color: 'var(--color-text-link)',
        textDecoration: 'none'
      }
    }, "EDIT")), /*#__PURE__*/React.createElement(Card, {
      title: "Doctor Information",
      onCopy: () => {}
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "Full Name",
      value: "Dr. Marc James"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Practice Name",
      value: "Skin Expert MD"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Contact",
      value: "(212) 555-0192 \xB7 Fax (212) 555-0193"
    }), /*#__PURE__*/React.createElement(Tag, {
      color: "green",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 10
      })
    }, "NPI Verified: 1942820011"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => e.preventDefault(),
      style: {
        font: '400 14px var(--font-body)',
        color: 'var(--color-text-link)',
        textDecoration: 'none'
      }
    }, "EDIT")));
  }

  // ── Medication + MD notes ─────────────────────────────────────────
  function MedRow() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.3fr 1fr',
        gap: 20,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Medication Information",
      onCopy: () => {}
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "Drug Name",
      value: "TYRVAYA (VARENICLINE SOLUTION) 0.03MG NASAL SPRAY",
      valueColor: "var(--color-brand)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(KeyValue, {
      label: "RX Number",
      value: "9941120-A"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "NDC",
      value: "73516-0001-01"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Drug Type",
      value: "Generic"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Quantity",
      value: "4"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Day of Supply",
      value: "30"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Refill Written",
      value: "11"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "ICD10 Code",
      value: "I10"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "DAW Code",
      value: "1"
    }), /*#__PURE__*/React.createElement(KeyValue, {
      label: "Manufacturer",
      value: "Oyster Point"
    })), /*#__PURE__*/React.createElement(KeyValue, {
      label: "SIG",
      value: "Use one spray in each nostril twice daily, approximately 12 hours apart."
    }), /*#__PURE__*/React.createElement(Button, {
      intent: "secondary",
      size: "md",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "folder",
        size: 16
      }),
      style: {
        marginTop: 4
      }
    }, "View Manufacturer Business Rules")), /*#__PURE__*/React.createElement(Card, {
      title: "MD Notes",
      style: {
        backgroundColor: 'var(--blue-50)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 12px var(--font-body)',
        letterSpacing: '.6px',
        textTransform: 'uppercase',
        color: 'var(--color-text-secondary)'
      }
    }, "Tried & Failed Step Therapy"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, [['Methotrexate (Oral)', '3 months ago'], ['Clobetasol Propionate', '6 months ago']].map(([m, t]) => /*#__PURE__*/React.createElement("div", {
      key: m,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        padding: '12px 14px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 14px var(--font-body)',
        color: 'var(--color-text-default)'
      }
    }, m), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'italic 400 13px var(--font-body)',
        color: 'var(--color-text-secondary)'
      }
    }, "Failed: ", t)))), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 12px var(--font-body)',
        letterSpacing: '.6px',
        textTransform: 'uppercase',
        color: 'var(--color-text-secondary)',
        marginTop: 4
      }
    }, "MD Progress Notes (latest)"), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: '400 14px var(--font-body)',
        color: 'var(--neutral-900)',
        lineHeight: 1.5
      }
    }, "\"Patient exhibits progressive decline in mobility despite standard first-line therapies. Recommendation for OncoRelief IV is based on genetic markers showing high affinity for the specific protein pathways targeted by this biologic\u2026\""), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 12px var(--font-body)',
        color: 'var(--color-text-secondary)'
      }
    }, "Last updated: 24h ago"), /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      size: 16,
      color: "var(--color-text-secondary)"
    })))));
  }

  // ── Right rail: PA Queue ──────────────────────────────────────────
  const SEED = [{
    t: 'Provider Notification Success callback received from CMM. cmmKey: BY9YXEB7',
    m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem'
  }, {
    t: 'Order woke up from sleep status',
    m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem'
  }, {
    t: 'Start PA completed by RPA. Order put to sleep for 30 mins.',
    m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem'
  }, {
    t: 'Create PA automation started via RPA. Order put to sleep for 10 mins.',
    m: 'Fri Aug 23, 2024 9:05 AM EDT · PhilSystem'
  }, {
    t: 'Prescription transferred from Phil to Sterling Specialty Pharmacy.',
    m: 'Fri Aug 23, 2024 9:05 AM EDT · Emmanuel Abujan (Psup Agent)'
  }];
  function PAQueue({
    feed,
    onSend,
    tab,
    setTab
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 360,
        flexShrink: 0,
        backgroundColor: 'var(--color-sidebar-bg)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '24px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 8,
        background: 'var(--color-brand-deep)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "list-checks",
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '700 18px var(--font-display)',
        color: 'rgb(25,28,29)'
      }
    }, "PA Queue")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 16px',
        display: 'flex',
        gap: 4,
        marginBottom: 8
      }
    }, [['comments', 'Comments', 'comment'], ['sop', 'PA Best Practice (SOP)', 'file']].map(([k, label, icon]) => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setTab(k),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 8,
        border: 'none',
        background: tab === k ? '#fff' : 'transparent',
        boxShadow: tab === k ? 'var(--shadow-card)' : 'none',
        font: '500 14px var(--font-ui)',
        color: tab === k ? 'var(--color-brand)' : 'var(--neutral-700)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 15
    }), label))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 16px 16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(CommentBox, {
      onSend: onSend
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        margin: '4px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 1,
        background: 'var(--color-border-muted)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 12px var(--font-body)',
        color: 'var(--color-text-secondary)'
      }
    }, "First fill"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 1,
        background: 'var(--color-border-muted)'
      }
    })), feed.map((c, i) => /*#__PURE__*/React.createElement(CommentItem, {
      key: i,
      meta: c.m
    }, c.t))));
  }
  function PADashboard() {
    const [status, setStatus] = useState('none'); // none | pending
    const [feed, setFeed] = useState(SEED);
    const [tab, setTab] = useState('comments');
    const start = provider => {
      setStatus('pending');
      setFeed(f => [{
        t: `Create PA automation started via RPA for ${provider}. Order put to sleep for 10 mins.`,
        m: 'Fri Jun 20, 2026 11:02 AM EDT · PhilSystem'
      }, ...f]);
    };
    const send = text => setFeed(f => [{
      t: text,
      m: 'Fri Jun 20, 2026 · You (PA Agent)'
    }, ...f]);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        background: PALETTE.appBg,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(AppHeader, null), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("main", {
      style: {
        flex: 1,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        overflowY: 'auto'
      }
    }, /*#__PURE__*/React.createElement(HeroPanel, {
      status: status,
      onStart: start
    }), /*#__PURE__*/React.createElement(DetailRow, null), /*#__PURE__*/React.createElement(MedRow, null)), /*#__PURE__*/React.createElement(PAQueue, {
      feed: feed,
      onSend: send,
      tab: tab,
      setTab: setTab
    })));
  }
  window.PADashboard = PADashboard;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ops_dashboard/PADashboard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.CommentBox = __ds_scope.CommentBox;

__ds_ns.CommentItem = __ds_scope.CommentItem;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.FileUpload = __ds_scope.FileUpload;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.KeyValue = __ds_scope.KeyValue;

__ds_ns.AppHeader = __ds_scope.AppHeader;

})();
