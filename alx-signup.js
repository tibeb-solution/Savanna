(() => {
  const SIGNUP_DRAFT_KEY = 'alx-signup-progress';
  const LOGIN_DRAFT_KEY = 'alx-login-progress';
  const PREFS_KEY = 'alx-signup:prefs';
  const DEFAULT_PREFS = {
    lang: 'en',
    textSize: 'normal',
    contrast: 'normal',
    audio: false,
    simpleMode: true,
    setupComplete: false
  };
  const LANGUAGES = [
    { code: 'am', name: 'አማርኛ' },
    { code: 'om', name: 'Afaan Oromoo' },
    { code: 'ti', name: 'ትግርኛ' },
    { code: 'ar', name: 'العربية' },
    { code: 'en', name: 'English' }
  ];
  let instanceCount = 0;

  const copy = {
    en: {
      signupTitle: 'Create your account',
      loginTitle: 'Sign in to your account',
      signupIntro: 'We will ask one question at a time. Your progress is saved on this device.',
      loginIntro: 'Sign in one step at a time. Your email is saved locally, but your password is never saved.',
      fullName: 'What is your full name?',
      email: 'What is your email address?',
      phone: 'What is your phone number?',
      idType: 'Which identity document or alternative do you have?',
      idNumber: 'What is your identity or reference number?',
      password: 'What is your password?',
      fullNameHint: 'Enter the name you want to use on your account.',
      emailHint: 'Use an email address you can access.',
      phoneHint: 'Include your country code if possible.',
      idTypeHint: 'Choose Kebele ID, Refugee Registration Number, or No Standard ID.',
      idNumberHint: 'Enter the number exactly as it appears on your document.',
      idNumberHints: {
        kebele_id: 'Kebele ID: enter 4 to 20 letters or numbers.',
        refugee_registration: 'Refugee Registration Number: enter 5 to 30 letters or numbers.',
        no_standard_id: 'No Standard ID: enter at least 3 characters for self-attestation.'
      },
      kebele: 'Kebele ID',
      refugee: 'Refugee Registration Number',
      noStandardId: 'No Standard ID',
      passwordHint: 'Your password must be at least 8 characters.',
      submitSignup: 'Create account',
      submitLogin: 'Sign in',
      next: 'Next',
      back: 'Back',
      larger: 'Larger text',
      smaller: 'Smaller text',
      reset: 'Reset text size',
      contrast: 'High contrast',
      voice: 'Speak into this field',
      listening: 'Listening...',
      voiceUnavailable: 'Voice input is not available. You can type instead.',
      voiceDone: 'Voice input added.',
      readPrompt: 'Read this question aloud',
      step: 'Step',
      of: 'of',
      summary: 'Please correct this answer:',
      required: 'This answer is required.',
      invalidEmail: 'Enter a valid email address.',
      invalidPhone: 'Enter a valid phone number.',
      invalidId: 'Enter a valid identity or reference number.',
      invalidPassword: 'Password must be at least 8 characters.',
      networkError: 'The service is unavailable. Your progress is still saved on this device.',
      signupSuccess: 'Your account details were saved successfully.',
      loginSuccess: 'You are signed in successfully.',
      progress: 'Progress saved on this device.',
      signInInstead: 'Already have an account? Sign in',
      signUpInstead: 'Need an account? Create one',
      loginMode: 'login',
      signupMode: 'signup',
      chooseLanguage: 'Choose your language',
      helpSettings: 'Help settings',
      textSize: 'Text size',
      normalText: 'Normal',
      largeText: 'Large',
      extraLargeText: 'Extra large',
      contrastSetting: 'Contrast',
      normalContrast: 'Normal contrast',
      highContrast: 'High contrast',
      simpleMode: 'Simple mode',
      simpleModeHint: 'Show one question at a time.',
      continue: 'Continue',
      languagePending: 'This language is available for selection. More translations are coming.',
      changeLanguage: 'Change language or settings',
      getHelp: 'Get help signing up',
      reviewTitle: 'Review your words',
      reviewText: 'Listen to the text and confirm it before adding it to the field.',
      transcribedText: 'Transcribed text',
      readAloud: 'Read aloud',
      confirm: 'Use this text',
      edit: 'Edit text',
      cancel: 'Cancel'
    },
    am: {
      signupTitle: 'መለያዎን ይፍጠሩ',
      loginTitle: 'ወደ መለያዎ ይግቡ',
      signupIntro: 'አንድ ጥያቄ በአንድ ጊዜ እንጠይቃለን። ሂደትዎ በዚህ መሣሪያ ላይ ይቀመጣል።',
      loginIntro: 'በአንድ እርምጃ ይግቡ። ኢሜይልዎ ይቀመጣል፣ የይለፍ ቃልዎ ግን አይቀመጥም።',
      fullName: 'ሙሉ ስምዎ ማን ነው?',
      email: 'የኢሜይል አድራሻዎ ምንድነው?',
      phone: 'የስልክ ቁጥርዎ ምንድነው?',
      idType: 'የትኛው የመታወቂያ ሰነድ ወይም አማራጭ አለዎት?',
      idNumber: 'የመታወቂያ ወይም የማጣቀሻ ቁጥርዎ ምንድነው?',
      password: 'የይለፍ ቃልዎ ምንድነው?',
      fullNameHint: 'በመለያዎ ላይ መጠቀም የሚፈልጉትን ስም ያስገቡ።',
      emailHint: 'መጠቀም የሚችሉትን ኢሜይል ያስገቡ።',
      phoneHint: 'ከተቻለ የአገር ኮድዎን ያካትቱ።',
      idTypeHint: 'የቀበሌ መታወቂያ፣ የስደተኛ ምዝገባ ወይም መታወቂያ የሌለዎትን ይምረጡ።',
      idNumberHint: 'ቁጥሩን በሰነዱ ላይ እንደሚታየው ያስገቡ።',
      idNumberHints: {
        kebele_id: 'የቀበሌ መታወቂያ፦ ከ4 እስከ 20 ፊደል ወይም ቁጥር።',
        refugee_registration: 'የስደተኛ ምዝገባ፦ ከ5 እስከ 30 ፊደል ወይም ቁጥር።',
        no_standard_id: 'መታወቂያ የለም፦ ቢያንስ 3 ፊደል ለራስ ማረጋገጫ ያስገቡ።'
      },
      kebele: 'የቀበሌ መታወቂያ',
      refugee: 'የስደተኛ ምዝገባ ቁጥር',
      noStandardId: 'መደበኛ መታወቂያ የለም',
      passwordHint: 'የይለፍ ቃሉ ቢያንስ 8 ቁምፊዎች ይኑሩት።',
      submitSignup: 'መለያ ይፍጠሩ',
      submitLogin: 'ይግቡ',
      next: 'ቀጣይ',
      back: 'ተመለስ',
      larger: 'ጽሑፍ ያሳድጉ',
      smaller: 'ጽሑፍ ያሳንሱ',
      reset: 'የጽሑፍ መጠን ይመልሱ',
      contrast: 'ከፍተኛ ንፅፅር',
      voice: 'በድምፅ ይናገሩ',
      listening: 'እያዳመጠ ነው...',
      voiceUnavailable: 'የድምፅ ግቤት አይገኝም። በመተየብ ይቀጥሉ።',
      voiceDone: 'የድምፅ ግቤት ተጨምሯል።',
      readPrompt: 'ይህን ጥያቄ ጮክ ብለው ያንብቡ',
      step: 'እርምጃ',
      of: 'ከ',
      summary: 'እባክዎ ይህን መልስ ያስተካክሉ፦',
      required: 'ይህ መልስ ያስፈልጋል።',
      invalidEmail: 'ትክክለኛ ኢሜይል ያስገቡ።',
      invalidPhone: 'ትክክለኛ የስልክ ቁጥር ያስገቡ።',
      invalidId: 'ትክክለኛ የመታወቂያ ቁጥር ያስገቡ።',
      invalidPassword: 'የይለፍ ቃሉ ቢያንስ 8 ቁምፊዎች ይኑሩት።',
      networkError: 'አገልግሎቱ አልተገኘም። ሂደትዎ በዚህ መሣሪያ ላይ ተቀምጧል።',
      signupSuccess: 'የመለያ መረጃዎ ተቀምጧል።',
      loginSuccess: 'በተሳካ ሁኔታ ገብተዋል።',
      progress: 'ሂደትዎ በዚህ መሣሪያ ላይ ተቀምጧል።',
      signInInstead: 'መለያ አለዎት? ይግቡ',
      signUpInstead: 'መለያ ይፈልጋሉ? ይፍጠሩ',
      loginMode: 'login',
      signupMode: 'signup',
      chooseLanguage: 'ቋንቋዎን ይምረጡ',
      helpSettings: 'የእርዳታ ቅንብሮች',
      textSize: 'የጽሑፍ መጠን',
      normalText: 'መደበኛ',
      largeText: 'ትልቅ',
      extraLargeText: 'በጣም ትልቅ',
      contrastSetting: 'ንፅፅር',
      normalContrast: 'መደበኛ ንፅፅር',
      highContrast: 'ከፍተኛ ንፅፅር',
      simpleMode: 'ቀላል ሁኔታ',
      simpleModeHint: 'አንድ ጥያቄ በአንድ ጊዜ ያሳያል።',
      continue: 'ቀጥል',
      languagePending: 'ይህ ቋንቋ ለመምረጥ ይገኛል። ተጨማሪ ትርጉሞች በቅርቡ ይመጣሉ።',
      changeLanguage: 'ቋንቋ ወይም ቅንብሮችን ይቀይሩ',
      getHelp: 'ለመመዝገብ እርዳታ ያግኙ',
      reviewTitle: 'የተናገሩትን ይገምግሙ',
      reviewText: 'ጽሑፉን ያዳምጡና ወደ መስኩ ከመጨመሩ በፊት ያረጋግጡ።',
      transcribedText: 'የተተረጎመ ጽሑፍ',
      readAloud: 'ጮክ ብሎ አንብብ',
      confirm: 'ይህን ጽሑፍ ተጠቀም',
      edit: 'ጽሑፉን አርም',
      cancel: 'ሰርዝ'
    }
  };

  class AlxSignup extends HTMLElement {
    connectedCallback() {
      if (this.querySelector('form')) return;
      this.preferences = this.loadPreferences();
      this.lang = this.preferences.lang || (this.getAttribute('lang') === 'am' ? 'am' : 'en');
      this.preferences.lang = this.lang;
      this.showPreferences = !this.preferences.setupComplete;
      this.applyPreferences();
      const requestedMode = new URLSearchParams(window.location.search).get('mode');
      this.mode = this.getAttribute('mode') === 'login'
        || (!this.hasAttribute('mode') && requestedMode === 'login') ? 'login' : 'signup';
      this.instanceId = `alx-onboard-${instanceCount += 1}`;
      this.steps = ['email', 'password'];
      this.formData = {
        email: '',
        password: ''
      };
      this.currentStep = 0;
      this.textScale = 100;
      this.render();
      this.attachEvents();
      this.loadOfflineProgress();
      if (!this.showPreferences) this.showStep();
    }

    text(key) {
      return (copy[this.lang] || copy.en)[key];
    }

    fieldId(name) {
      return `${this.instanceId}-${name}`;
    }

    render() {
      const id = (name) => this.fieldId(name);
      this.innerHTML = `
        <style>
          .alx-signup {
            --alx-text: #111;
            --alx-background: #fff;
            --alx-border: #333;
            --alx-focus: #005fcc;
            --alx-error: #a00000;
            background: var(--alx-background);
            color: var(--alx-text);
            font: 1rem/1.5 system-ui, sans-serif;
            max-width: 42rem;
            padding: 1rem;
          }
          .alx-signup__preferences {
            background: var(--surface-color, #fff);
            border: 2px solid var(--text-color, #111);
            box-sizing: border-box;
            color: var(--text-color, #111);
            margin-inline: calc(50% - 50vw);
            max-width: none;
            min-height: 100vh;
            padding: clamp(1rem, 5vw, 4rem);
            width: 100vw;
          }
          .alx-signup__language-control { margin-block-end: 1rem; }
          .alx-signup__preferences[hidden], .alx-signup[hidden] { display: none; }
          .alx-signup__language-list, .alx-signup__preference-actions {
            display: flex;
            flex-wrap: wrap;
            gap: .75rem;
          }
          .alx-signup__language-list { margin-block: 1rem; }
          .alx-signup__language-list button { flex: 1 1 9rem; }
          .alx-signup__preferences button {
            min-height: 2.75rem;
            min-width: 2.75rem;
            padding: .6rem .8rem;
          }
          .alx-signup__preferences label {
            display: block;
            font-weight: 700;
            margin-block: 1rem .35rem;
          }
          .alx-signup.is-high-contrast {
            --alx-text: #ffff00;
            --alx-background: #000;
            --alx-border: #fff;
            --alx-focus: #ffff00;
            --alx-error: #ffff00;
          }
          .alx-signup.is-high-contrast button { background: #000; border: 2px solid #fff; color: #ffff00; }
          .alx-signup__toolbar, .alx-signup__actions { display: flex; flex-wrap: wrap; gap: .5rem; }
          .alx-signup__toolbar { margin-block-end: 1rem; }
          .alx-signup button { min-height: 2.75rem; min-width: 2.75rem; padding: .6rem .8rem; }
          .alx-signup__field { margin-block: 1.5rem; }
          .alx-signup label { display: block; font-size: 1.25em; font-weight: 700; margin-block-end: .5rem; }
          .alx-signup input {
            background: var(--alx-background);
            border: 2px solid var(--alx-border);
            box-sizing: border-box;
            color: var(--alx-text);
            font: inherit;
            min-height: 2.75rem;
            padding: .7rem;
            width: 100%;
          }
          .alx-signup__voice { margin-block-start: .75rem; }
          .alx-signup button:focus-visible, .alx-signup input:focus-visible,
          .alx-signup__summary:focus-visible, .alx-signup a:focus-visible {
            outline: 3px solid var(--alx-focus);
            outline-offset: 3px;
          }
          .alx-signup__hint { display: block; margin-block-start: .5rem; }
          .alx-signup__error { color: var(--alx-error); font-weight: 700; margin-block-start: .5rem; }
          .alx-signup__summary { border: 3px solid var(--alx-error); margin-block: 1rem; padding: .75rem; }
          .alx-signup__summary[hidden], .alx-signup__step[hidden] { display: none; }
          .alx-signup__voice-dialog {
            border: 0;
            border-radius: .5rem;
            box-sizing: border-box;
            max-width: min(36rem, calc(100vw - 2rem));
            padding: 0;
            width: 100%;
          }
          .alx-signup__voice-dialog::backdrop { background: rgb(0 0 0 / 70%); }
          .alx-signup__dialog-card { padding: clamp(1rem, 4vw, 2rem); }
          .alx-signup__dialog-card textarea {
            box-sizing: border-box;
            font: inherit;
            min-height: 8rem;
            padding: .75rem;
            resize: vertical;
            width: 100%;
          }
          .alx-signup__dialog-actions {
            display: flex;
            flex-wrap: wrap;
            gap: .75rem;
            margin-block-start: 1rem;
          }
          .alx-signup__voice-dialog button {
            min-height: 2.75rem;
            min-width: 2.75rem;
            padding: .6rem .8rem;
          }
          .alx-signup__status { min-height: 1.5em; }
          .alx-signup__progress { font-weight: 700; }
          @media (max-width: 30rem) {
            .alx-signup { padding: .75rem; }
            .alx-signup__preferences { padding: .75rem; }
            .alx-signup__toolbar button, .alx-signup__actions button { flex: 1 1 9rem; }
          }
        </style>
        <div class="alx-signup__language-control">
          <button type="button" data-action="preferences">${this.text('changeLanguage')}</button>
        </div>
        <section class="alx-signup__preferences" ${this.showPreferences ? '' : 'hidden'} aria-labelledby="${this.fieldId('preferences-title')}">
          <h2 id="${this.fieldId('preferences-title')}">${this.text('chooseLanguage')}</h2>
          <div class="alx-signup__language-list" role="group" aria-label="${this.text('chooseLanguage')}">
            ${LANGUAGES.map(({ code, name }) => `<button type="button" data-language="${code}" aria-pressed="${this.lang === code}">${name}</button>`).join('')}
          </div>
          <p>${this.text('languagePending')}</p>
          <button type="button" data-action="help-settings">${this.text('helpSettings')}</button>
          <div class="alx-signup__settings" hidden>
            <label for="${this.fieldId('text-size')}">${this.text('textSize')}</label>
            <select id="${this.fieldId('text-size')}" data-preference="textSize">
              <option value="normal">${this.text('normalText')}</option>
              <option value="large">${this.text('largeText')}</option>
              <option value="xlarge">${this.text('extraLargeText')}</option>
            </select>
            <label for="${this.fieldId('contrast')}">${this.text('contrastSetting')}</label>
            <select id="${this.fieldId('contrast')}" data-preference="contrast">
              <option value="normal">${this.text('normalContrast')}</option>
              <option value="high">${this.text('highContrast')}</option>
            </select>
            <label>
              <input type="checkbox" data-preference="simpleMode">
              ${this.text('simpleMode')}
            </label>
            <span class="alx-signup__hint">${this.text('simpleModeHint')}</span>
          </div>
          <div class="alx-signup__preference-actions">
            <button type="button" data-action="continue">${this.text('continue')}</button>
          </div>
          <p><a href="#assisted-signup">${this.text('getHelp')}</a></p>
        </section>
        <form class="alx-signup" ${this.showPreferences ? 'hidden' : ''} novalidate>
          <div class="alx-signup__toolbar" aria-label="Accessibility controls">
            <button type="button" data-text-action="increase">${this.text('larger')}</button>
            <button type="button" data-text-action="decrease">${this.text('smaller')}</button>
            <button type="button" data-text-action="reset">${this.text('reset')}</button>
            <button type="button" data-text-action="contrast" aria-pressed="false">${this.text('contrast')}</button>
          </div>
          <h2>${this.mode === 'login' ? this.text('loginTitle') : this.text('signupTitle')}</h2>
          <p>${this.mode === 'login' ? this.text('loginIntro') : this.text('signupIntro')}</p>
          <p class="alx-signup__step-count" aria-live="polite"></p>
          <div id="error-summary" class="alx-signup__summary" role="alert" tabindex="-1" hidden></div>
          ${this.renderField('email', 'email', 'username', 'emailHint')}
          ${this.renderField('password', 'password', this.mode === 'login' ? 'current-password' : 'new-password', 'passwordHint')}
          <div class="alx-signup__actions">
            <button type="button" data-action="back">${this.text('back')}</button>
            <button type="button" data-action="next">${this.text('next')}</button>
            <button type="submit" data-action="submit">${this.mode === 'login' ? this.text('submitLogin') : this.text('submitSignup')}</button>
          </div>
          <p class="alx-signup__status" role="status" aria-live="polite"></p>
          <p class="alx-signup__progress">${this.text('progress')}</p>
          <p><a href="?mode=${this.mode === 'login' ? this.text('signupMode') : this.text('loginMode')}">${this.mode === 'login' ? this.text('signUpInstead') : this.text('signInInstead')}</a></p>
        </form>
        <dialog class="alx-signup__voice-dialog" aria-labelledby="${this.fieldId('voice-review-title')}">
          <form method="dialog" class="alx-signup__dialog-card" id="${this.fieldId('voice-review-form')}">
            <h2 id="${this.fieldId('voice-review-title')}">${this.text('reviewTitle')}</h2>
            <p>${this.text('reviewText')}</p>
            <label for="${this.fieldId('voice-text')}">${this.text('transcribedText')}</label>
            <textarea id="${this.fieldId('voice-text')}" rows="5"></textarea>
            <div class="alx-signup__dialog-actions">
              <button type="button" data-voice-read>${this.text('readAloud')}</button>
              <button type="submit" value="confirm" data-voice-confirm>${this.text('confirm')}</button>
              <button type="button" data-voice-edit>${this.text('edit')}</button>
              <button type="submit" value="cancel">${this.text('cancel')}</button>
            </div>
          </form>
        </dialog>`;
    }

    renderField(name, type, autocomplete, hintKey) {
      const id = this.fieldId(name);
      return `
        <div class="alx-signup__step" data-step="${name}" hidden>
          <div class="alx-signup__field">
            <label for="${id}">${this.text(name)}</label>
            <input id="${id}" name="${name}" type="${type}" autocomplete="${autocomplete}" aria-describedby="${id}-hint">
            <span class="alx-signup__hint" id="${id}-hint">${this.text(hintKey)}</span>
            <button class="alx-signup__read" type="button" data-read-target="${name}">${this.text('readPrompt')}</button>
            <button class="alx-signup__voice" type="button" data-voice-target="${name}">${this.text('voice')}</button>
            <div class="alx-signup__error" id="${id}-error" aria-live="polite"></div>
          </div>
        </div>`;
    }

    loadPreferences() {
      try {
        const saved = JSON.parse(localStorage.getItem(PREFS_KEY) || 'null');
        return saved && typeof saved === 'object'
          ? { ...DEFAULT_PREFS, ...saved }
          : { ...DEFAULT_PREFS };
      } catch (error) {
        console.warn('Unable to restore accessibility preferences.', error);
        return { ...DEFAULT_PREFS };
      }
    }

    savePreferences() {
      try {
        localStorage.setItem(PREFS_KEY, JSON.stringify(this.preferences));
      } catch (error) {
        console.warn('Unable to save accessibility preferences.', error);
      }
    }

    applyPreferences() {
      const root = document.documentElement;
      root.lang = this.lang;
      root.dir = this.lang === 'ar' ? 'rtl' : 'ltr';
      root.dataset.text = this.preferences.textSize;
      root.dataset.contrast = this.preferences.contrast;
      const form = this.querySelector('.alx-signup');
      if (form) form.classList.toggle('is-high-contrast', this.preferences.contrast === 'high');
    }

    attachEvents() {
      this.querySelectorAll('[data-language]').forEach((button) => {
        button.addEventListener('click', () => {
          this.lang = button.dataset.language;
          this.preferences.lang = this.lang;
          this.savePreferences();
          this.applyPreferences();
          this.render();
          this.attachEvents();
          this.loadOfflineProgress();
          if (!this.showPreferences) this.showStep();
        });
      });
      const settings = this.querySelector('.alx-signup__settings');
      const settingsButton = this.querySelector('[data-action="help-settings"]');
      if (settings && settingsButton) {
        settingsButton.addEventListener('click', () => {
          settings.hidden = !settings.hidden;
        });
      }
      this.querySelectorAll('[data-preference]').forEach((control) => {
        const preference = control.dataset.preference;
        if (control.type === 'checkbox') control.checked = Boolean(this.preferences[preference]);
        else control.value = this.preferences[preference];
        control.addEventListener('change', () => {
          this.preferences[preference] = control.type === 'checkbox'
            ? control.checked
            : control.value;
          this.savePreferences();
          this.applyPreferences();
        });
      });
      const continueButton = this.querySelector('[data-action="continue"]');
      if (continueButton) {
        continueButton.addEventListener('click', () => {
          this.showPreferences = false;
          this.preferences.setupComplete = true;
          this.savePreferences();
          this.render();
          this.attachEvents();
          this.loadOfflineProgress();
          this.showStep();
        });
      }
      const preferencesButton = this.querySelector('[data-action="preferences"]');
      if (preferencesButton) {
        preferencesButton.addEventListener('click', () => {
          this.showPreferences = true;
          this.render();
          this.attachEvents();
          this.loadOfflineProgress();
        });
      }
      const form = this.querySelector('form');
      this.applyPreferences();
      form.addEventListener('input', (event) => {
        if (!event.target.name) return;
        this.formData[event.target.name] = event.target.value;
        this.clearFieldError(event.target.name);
        this.saveProgress();
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.finish();
      });
      this.querySelector('[data-action="back"]').addEventListener('click', () => {
        if (this.currentStep > 0) {
          this.currentStep -= 1;
          this.showStep();
        }
      });
      this.querySelector('[data-action="next"]').addEventListener('click', () => this.goNext());
      this.querySelectorAll('[data-voice-target]').forEach((button) => {
        button.addEventListener('click', () => this.setupSpeechRecognition(button.dataset.voiceTarget, button));
      });
      this.querySelectorAll('[data-read-target]').forEach((button) => {
        button.addEventListener('click', () => this.readPrompt(button.dataset.readTarget));
      });
      const dialog = this.querySelector('.alx-signup__voice-dialog');
      if (dialog) {
        dialog.addEventListener('close', () => this.finishVoiceReview(dialog.returnValue));
        dialog.querySelector('[data-voice-read]').addEventListener('click', () => {
          this.readAloud(dialog.querySelector('textarea').value);
        });
        dialog.querySelector('[data-voice-edit]').addEventListener('click', () => {
          dialog.querySelector('textarea').focus();
        });
      }
      this.handleAccessibilityControls();
    }

    handleAccessibilityControls() {
      const root = this.querySelector('.alx-signup');
      const contrastButton = this.querySelector('[data-text-action="contrast"]');
      this.querySelectorAll('[data-text-action]').forEach((button) => {
        button.addEventListener('click', () => {
          const action = button.dataset.textAction;
          if (action === 'increase') this.textScale = Math.min(400, this.textScale + 100);
          if (action === 'decrease') this.textScale = Math.max(100, this.textScale - 100);
          if (action === 'reset') this.textScale = 100;
          if (action !== 'contrast') {
            root.style.fontSize = `${this.textScale / 100}rem`;
            button.setAttribute('aria-label', `${button.textContent} (${this.textScale}%)`);
          }
          if (action === 'contrast') {
            const active = root.classList.toggle('is-high-contrast');
            contrastButton.setAttribute('aria-pressed', String(active));
          }
        });
      });
    }

    loadOfflineProgress() {
      try {
        const key = this.mode === 'login' ? LOGIN_DRAFT_KEY : SIGNUP_DRAFT_KEY;
        const draft = JSON.parse(localStorage.getItem(key) || 'null');
        if (!draft || typeof draft !== 'object') return;
        Object.keys(this.formData).forEach((name) => {
          if (typeof draft[name] !== 'string') return;
          this.formData[name] = draft[name];
          const field = this.querySelector(`[name="${name}"]`);
          if (field) field.value = draft[name];
        });
      } catch (error) {
        console.warn('Unable to restore onboarding progress.', error);
      }
    }

    saveProgress() {
      try {
        const key = this.mode === 'login' ? LOGIN_DRAFT_KEY : SIGNUP_DRAFT_KEY;
        const safeDraft = { ...this.formData };
        delete safeDraft.password;
        localStorage.setItem(key, JSON.stringify(safeDraft));
        this.querySelector('.alx-signup__status').textContent = this.text('progress');
      } catch (error) {
        console.warn('Unable to save onboarding progress.', error);
      }
    }

    showStep() {
      if (!this.preferences.simpleMode) {
        this.querySelectorAll('.alx-signup__step').forEach((step) => { step.hidden = false; });
        this.querySelector('.alx-signup__step-count').textContent =
          `${this.steps.length} ${this.text('step').toLowerCase()}s`;
        this.querySelector('[data-action="back"]').hidden = true;
        this.querySelector('[data-action="next"]').hidden = true;
        this.querySelector('[data-action="submit"]').hidden = false;
        return;
      }
      this.querySelectorAll('.alx-signup__step').forEach((step) => {
        step.hidden = step.dataset.step !== this.steps[this.currentStep];
      });
      this.querySelector('.alx-signup__step-count').textContent =
        `${this.text('step')} ${this.currentStep + 1} ${this.text('of')} ${this.steps.length}`;
      this.querySelector('[data-action="back"]').hidden = this.currentStep === 0;
      this.querySelector('[data-action="next"]').hidden = this.currentStep === this.steps.length - 1;
      this.querySelector('[data-action="submit"]').hidden = this.currentStep !== this.steps.length - 1;
      this.querySelector(`[name="${this.steps[this.currentStep]}"]`).focus();
    }

    goNext() {
      if (!this.validateCurrentStep()) return;
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep += 1;
        this.showStep();
      }
    }

    validateCurrentStep() {
      const name = this.steps[this.currentStep];
      const value = (this.formData[name] || '').trim();
      let error = '';
      if (!value) error = this.text('required');
      if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = this.text('invalidEmail');
      if (name === 'password' && value.length < 8) error = this.text('invalidPassword');
      this.clearFieldError(name);
      if (!error) {
        this.hideSummary();
        return true;
      }
      this.setFieldError(name, error);
      const summary = this.querySelector('#error-summary');
      summary.innerHTML = `${this.text('summary')} <a href="#${this.fieldId(name)}">${error}</a>`;
      summary.hidden = false;
      summary.focus();
      return false;
    }

    validateAll() {
      const errors = {};
      this.steps.forEach((name) => {
        const value = (this.formData[name] || '').trim();
        if (!value) {
          errors[name] = this.text('required');
          return;
        }
        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = this.text('invalidEmail');
        }
        if (name === 'password' && value.length < 8) {
          errors.password = this.text('invalidPassword');
        }
      });
      return errors;
    }

    clearFieldError(name) {
      const field = this.querySelector(`[name="${name}"]`);
      const error = this.querySelector(`#${this.fieldId(name)}-error`);
      if (!field || !error) return;
      field.removeAttribute('aria-invalid');
      field.setAttribute('aria-describedby', `${this.fieldId(name)}-hint`);
      error.textContent = '';
    }

    setFieldError(name, message) {
      const field = this.querySelector(`[name="${name}"]`);
      const error = this.querySelector(`#${this.fieldId(name)}-error`);
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', `${this.fieldId(name)}-error`);
      error.textContent = message;
    }

    hideSummary() {
      const summary = this.querySelector('#error-summary');
      summary.hidden = true;
      summary.textContent = '';
    }

    finish() {
      const errors = this.validateAll();
      if (Object.keys(errors).length) {
        this.showErrors(errors);
        return;
      }
      const key = this.mode === 'login' ? LOGIN_DRAFT_KEY : SIGNUP_DRAFT_KEY;
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('Unable to clear onboarding progress.', error);
      }
      const detail = { ...this.formData };
      delete detail.password;
      this.querySelector('.alx-signup__status').textContent =
        this.mode === 'login' ? this.text('loginSuccess') : this.text('signupSuccess');
      this.dispatchEvent(new CustomEvent(this.mode === 'login' ? 'login-success' : 'signup-success', {
        detail,
        bubbles: true
      }));
    }

    showErrors(errors) {
      Object.keys(this.formData).forEach((name) => this.clearFieldError(name));
      Object.entries(errors).forEach(([name, message]) => {
        const field = this.querySelector(`[name="${name}"]`);
        const error = this.querySelector(`#${this.fieldId(name)}-error`);
        if (!field || !error) return;
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', `${this.fieldId(name)}-hint ${this.fieldId(name)}-error`);
        error.textContent = message;
      });
      const summary = this.querySelector('#error-summary');
      summary.innerHTML = `${this.text('summary')}<ul>${Object.entries(errors)
        .map(([name, message]) => `<li><a href="#${this.fieldId(name)}">${message}</a></li>`).join('')}</ul>`;
      summary.hidden = false;
      summary.focus();
    }

    setupSpeechRecognition(name, button) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const field = this.querySelector(`[name="${name}"]`);
      const status = this.querySelector('.alx-signup__status');
      if (!SpeechRecognition || !field) {
        status.textContent = this.text('voiceUnavailable');
        return;
      }
      const recognition = new SpeechRecognition();
      const originalLabel = button.textContent;
      recognition.lang = this.lang === 'am' ? 'am-ET' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => {
        button.textContent = this.text('listening');
        status.textContent = this.text('listening');
      };
      recognition.onresult = (event) => {
        this.openVoiceReview(name, button, event.results[0][0].transcript);
      };
      recognition.onerror = () => { status.textContent = this.text('voiceUnavailable'); };
      recognition.onend = () => { button.textContent = originalLabel; };
      recognition.start();
    }

    openVoiceReview(name, button, transcript) {
      const dialog = this.querySelector('.alx-signup__voice-dialog');
      if (!dialog) return;
      this.pendingVoice = { name, button };
      dialog.querySelector('textarea').value = transcript;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      dialog.querySelector('textarea').focus();
    }

    finishVoiceReview(result) {
      if (result !== 'confirm' || !this.pendingVoice) {
        this.pendingVoice = null;
        return;
      }
      const dialog = this.querySelector('.alx-signup__voice-dialog');
      const field = this.querySelector(`[name="${this.pendingVoice.name}"]`);
      if (field && dialog) {
        field.value = dialog.querySelector('textarea').value;
        field.dispatchEvent(new Event('input', { bubbles: true }));
        this.querySelector('.alx-signup__status').textContent = this.text('voiceDone');
      }
      this.pendingVoice = null;
    }

    readPrompt(name) {
      const field = this.querySelector(`[name="${name}"]`);
      if (!field) return;
      const label = this.querySelector(`label[for="${field.id}"]`);
      const hint = this.querySelector(`#${field.id}-hint`);
      this.readAloud(`${label ? label.textContent : ''}. ${hint ? hint.textContent : ''}`);
    }

    readAloud(text) {
      if (!text || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = { am: 'am-ET', om: 'om-ET', ti: 'ti-ET', ar: 'ar-SA', en: 'en-US' }[this.lang] || 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }

  customElements.define('alx-signup', AlxSignup);
})();
