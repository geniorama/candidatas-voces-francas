/* Tweaks for Voces Francas landing
   Cambios rápidos sobre paleta y estilo tipográfico. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bgPalette": "morado-claro",
  "titleStyle": "shadow"
}/*EDITMODE-END*/;

const PALETTES = {
  "morado-claro": { bg: "#c298e1", title: "#46277e", entry: "#b9f86c", credits: "#b9f86c", label: "Morado claro" },
  "morado":       { bg: "#ab63de", title: "#46277e", entry: "#b9f86c", credits: "#b9f86c", label: "Morado" },
  "magenta-claro":{ bg: "#f6ace3", title: "#46277e", entry: "#b9f86c", credits: "#46277e", label: "Magenta claro" },
  "verde-claro":  { bg: "#ceecb9", title: "#46277e", entry: "#46277e", credits: "#46277e", label: "Verde claro" },
};

function applyTweaks(t) {
  const p = PALETTES[t.bgPalette] || PALETTES["morado-claro"];
  const root = document.documentElement;
  root.style.setProperty('--bg', p.bg);
  root.style.setProperty('--ink-title', p.title);
  root.style.setProperty('--ink-entry', p.entry);
  root.style.setProperty('--ink-credits', p.credits);

  // Title style
  document.querySelectorAll('.section-title, .card-title, .allies-title').forEach(el => {
    if (t.titleStyle === 'flat') {
      el.style.textShadow = 'none';
    } else if (t.titleStyle === 'outline') {
      el.style.textShadow = `-1.5px -1.5px 0 ${p.title}, 1.5px -1.5px 0 ${p.title}, -1.5px 1.5px 0 ${p.title}, 1.5px 1.5px 0 ${p.title}`;
    } else {
      el.style.textShadow = '';
    }
  });
}

function TweaksApp() {
  const { TweaksPanel, useTweaks, TweakSection, TweakSelect, TweakRadio } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Paleta de fondo">
        <TweakSelect
          label="Color de fondo"
          value={t.bgPalette}
          options={Object.entries(PALETTES).map(([k, v]) => ({ value: k, label: v.label }))}
          onChange={v => setTweak('bgPalette', v)}
        />
      </TweakSection>

      <TweakSection title="Tipografía de títulos">
        <TweakRadio
          label="Estilo"
          value={t.titleStyle}
          options={[
            { value: 'shadow',  label: 'Sombra' },
            { value: 'flat',    label: 'Plano' },
            { value: 'outline', label: 'Contorno' },
          ]}
          onChange={v => setTweak('titleStyle', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = document.getElementById('tweaks-root');
if (tweaksRoot) {
  ReactDOM.createRoot(tweaksRoot).render(<TweaksApp />);
}
