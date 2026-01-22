import React, { useState } from 'react';
import { Check, AlertCircle, Mail } from 'lucide-react';

const Frictiescan = () => {
  const [bedrijfsnaam, setBedrijfsnaam] = useState('');
  const [responses, setResponses] = useState({});
  const [openAnswers, setOpenAnswers] = useState({});
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTelefoon, setContactTelefoon] = useState('');
  const [functie, setFunctie] = useState('');
  const [aantalMedewerkers, setAantalMedewerkers] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const domeinen = [
    {
      id: 'richting',
      naam: 'Richting en doelen',
      uitleg: 'Hoe helder zijn de verwachtingen, prioriteiten en doelstellingen binnen uw organisatie? Dit domein gaat over duidelijkheid in communicatie en het verbinden van individueel werk aan organisatiedoelen.',
      stellingen: [
        { id: 'r1', tekst: 'Ik communiceer helder wat ik van mijn medewerker verwacht' },
        { id: 'r2', tekst: 'Mijn team weet precies wat de prioriteiten zijn' },
        { id: 'r3', tekst: 'Ik bespreek doelen tijdig en concreet' },
        { id: 'r4', tekst: 'Ik maak duidelijk hoe het werk van de medewerker bijdraagt aan de organisatie' }
      ],
      openVragen: [
        { id: 'ro1', vraag: 'Waar merkt u dat uw medewerker(s) onvoldoende richting ervaren?' },
        { id: 'ro2', vraag: 'Wat zou u zelf concreter of duidelijker kunnen benoemen?' }
      ]
    },
    {
      id: 'autonomie',
      naam: 'Autonomie en vertrouwen',
      uitleg: 'In hoeverre geeft u ruimte aan medewerkers om zelf keuzes te maken en verantwoordelijkheid te nemen? Dit domein gaat over vertrouwen geven, loslaten en sturen op resultaat in plaats van controle.',
      stellingen: [
        { id: 'a1', tekst: 'Ik geef mijn medewerker voldoende ruimte om zelf keuzes te maken' },
        { id: 'a2', tekst: 'Ik vertrouw erop dat mijn medewerker zijn of haar verantwoordelijkheid neemt' },
        { id: 'a3', tekst: 'Ik stuur op resultaat, niet op microcontrole' },
        { id: 'a4', tekst: 'Ik durf taken los te laten zonder alles te controleren' }
      ],
      openVragen: [
        { id: 'ao1', vraag: 'Waar laat u minder los dan eigenlijk nodig is?' },
        { id: 'ao2', vraag: 'Wat zou u kunnen doen om meer vertrouwen te laten zien?' }
      ]
    },
    {
      id: 'samenwerking',
      naam: 'Samenwerking en communicatie',
      uitleg: 'Hoe open en veilig is de communicatie binnen uw team? Dit domein gaat over een sfeer waarin problemen bespreekbaar zijn, feedback wordt gegeven en medewerkers zich gehoord voelen.',
      stellingen: [
        { id: 's1', tekst: 'Ik creëer een sfeer waarin medewerkers problemen durven benoemen' },
        { id: 's2', tekst: 'Ik vraag regelmatig of er knelpunten zijn in de samenwerking' },
        { id: 's3', tekst: 'Ik communiceer open en eerlijk, ook over lastige onderwerpen' },
        { id: 's4', tekst: 'Ik ben beschikbaar en toegankelijk voor mijn medewerkers' }
      ],
      openVragen: [
        { id: 'so1', vraag: 'Waar loopt de samenwerking volgens u stroef?' },
        { id: 'so2', vraag: 'Welke signalen krijgt u dat medewerkers dingen niet durven te zeggen?' }
      ]
    },
    {
      id: 'erkenning',
      naam: 'Erkenning en waardering',
      uitleg: 'Hoe laat u zien dat u de inzet en bijdrage van uw medewerkers waardeert? Dit domein gaat over het geven van feedback, erkenning en het creëren van een cultuur waarin mensen zich gezien voelen.',
      stellingen: [
        { id: 'e1', tekst: 'Ik geef regelmatig positieve feedback' },
        { id: 'e2', tekst: 'Ik benoem concreet wat mijn medewerkers goed doen' },
        { id: 'e3', tekst: 'Ik laat merken dat ik inzet waardeer, niet alleen resultaten' },
        { id: 'e4', tekst: 'Ik zie tijdig wanneer een medewerker meer erkenning nodig heeft' }
      ],
      openVragen: [
        { id: 'eo1', vraag: 'Waar merkt u dat een medewerker zich onvoldoende gezien voelt?' },
        { id: 'eo2', vraag: 'Wat zou u anders kunnen doen om waardering duidelijker te tonen?' }
      ]
    },
    {
      id: 'groei',
      naam: 'Groei en ontwikkeling',
      uitleg: 'Hoe stimuleert u de ontwikkeling van uw medewerkers? Dit domein gaat over het bieden van uitdaging, leerruimte en perspectief, zodat medewerkers blijven groeien in hun functie.',
      stellingen: [
        { id: 'g1', tekst: 'Ik bespreek regelmatig de ontwikkeling van mijn medewerkers' },
        { id: 'g2', tekst: 'Ik geef ruimte om te leren, ook als dat fouten maken betekent' },
        { id: 'g3', tekst: 'Ik bied voldoende uitdaging en perspectief' },
        { id: 'g4', tekst: 'Ik signaleer wanneer iemand niet groeit en onderneem actie' }
      ],
      openVragen: [
        { id: 'go1', vraag: 'Waar ziet u groeipotentieel bij uw medewerker(s) dat nog niet benut wordt?' },
        { id: 'go2', vraag: 'Wat zou u kunnen doen om ontwikkeling actiever te ondersteunen?' }
      ]
    }
  ];

  const handleResponse = (stellingId, waarde) => {
    setResponses(prev => ({ ...prev, [stellingId]: waarde }));
  };

  const handleOpenAnswer = (vraagId, antwoord) => {
    setOpenAnswers(prev => ({ ...prev, [vraagId]: antwoord }));
  };

  const getScore = (domeinId) => {
    const domein = domeinen.find(d => d.id === domeinId);
    const stellingIds = domein.stellingen.map(s => s.id);
    const domeinResponses = stellingIds.map(id => responses[id]).filter(r => r !== undefined);
    if (domeinResponses.length === 0) return null;
    const sum = domeinResponses.reduce((acc, val) => acc + val, 0);
    const avg = sum / stellingIds.length;
    return Math.round(avg * 10) / 10; // Round to 1 decimal
  };

  const getGemiddeldeScore = () => {
    const scores = domeinen.map(d => getScore(d.id)).filter(s => s !== null);
    if (scores.length === 0) return null;
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg * 10) / 10;
  };

  const getKleur = (score) => {
    if (score === null) return 'bg-gray-200';
    if (score >= 4) return 'bg-slate-600';
    if (score >= 3) return 'bg-slate-500';
    if (score >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreInterpretatie = (score) => {
    if (score === null) return '';
    if (score >= 4) return 'Sterk - U ervaart dit domein als goed ontwikkeld';
    if (score >= 3) return 'Voldoende - Er is basis, maar ruimte voor verbetering';
    if (score >= 2) return 'Aandachtspunt - Dit vraagt actie en bewustwording';
    return 'Kritiek - Hier ligt een belangrijke ontwikkelkans';
  };

  const isScanCompleet = () => {
    const totaalStellingen = domeinen.reduce((sum, d) => sum + d.stellingen.length, 0);
    return Object.keys(responses).length === totaalStellingen;
  };

  const generateHTMLRapport = () => {
    const gemiddeldeScore = getGemiddeldeScore();
    
    const getScoreColor = (score) => {
      if (score >= 4) return '#475569';
      if (score >= 3) return '#f59e0b';
      if (score >= 2) return '#fb923c';
      return '#ef4444';
    };

    let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #292524; margin: 0; padding: 0; background-color: #fafaf9; }
    .container { max-width: 700px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); color: white; padding: 50px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: bold; letter-spacing: -0.5px; }
    .header p { margin: 15px 0 0 0; opacity: 0.95; font-size: 18px; }
    .content { padding: 40px 35px; }
    .info-box { background-color: #f8fafc; border-left: 4px solid #475569; padding: 20px; margin: 25px 0; border-radius: 6px; }
    .info-box strong { color: #0f172a; }
    .score-card { background-color: #fafaf9; border-radius: 10px; padding: 25px; margin: 25px 0; border: 2px solid #e7e5e4; }
    .score-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
    .score-title { font-size: 20px; font-weight: bold; color: #292524; }
    .score-value { font-size: 28px; font-weight: bold; }
    .score-bar { width: 100%; height: 28px; background-color: #e7e5e4; border-radius: 14px; overflow: hidden; margin-top: 12px; }
    .score-fill { height: 100%; transition: width 0.3s ease; }
    .interpretation { padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 15px; background-color: #f8fafc; color: #0f172a; border-left: 4px solid #475569; }
    .stelling-item { padding: 10px 15px; margin: 8px 0; background-color: #fafaf9; border-radius: 6px; font-size: 15px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #e7e5e4; }
    .stelling-text { flex: 1; color: #57534e; }
    .stelling-score { font-weight: bold; font-size: 18px; min-width: 40px; text-align: right; }
    .open-vragen { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #f1f5f9; }
    .open-vraag { margin: 15px 0; }
    .open-vraag-label { font-weight: bold; color: #0f172a; margin-bottom: 8px; font-size: 14px; }
    .open-vraag-antwoord { background-color: white; padding: 12px; border-radius: 6px; color: #57534e; font-style: italic; border: 1px solid #e7e5e4; white-space: pre-wrap; }
    .belangrijke-boodschap { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 3px solid #475569; border-radius: 12px; padding: 30px; margin: 40px 0; }
    .belangrijke-boodschap h3 { color: #0f172a; font-size: 22px; margin-top: 0; margin-bottom: 15px; }
    .belangrijke-boodschap p { color: #292524; font-size: 16px; line-height: 1.8; margin: 12px 0; }
    .belangrijke-boodschap strong { color: #0f172a; }
    .cta-section { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 35px; border-radius: 12px; margin: 35px 0; text-align: center; }
    .cta-section h3 { margin-top: 0; font-size: 24px; }
    .cta-button { display: inline-block; background-color: white; color: #0f172a; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 18px; margin-top: 20px; transition: transform 0.2s; }
    .cta-button:hover { transform: scale(1.05); }
    .footer { background-color: #fafaf9; padding: 35px; text-align: center; border-top: 2px solid #e7e5e4; }
    .footer-signature { margin: 25px 0; }
    .footer-signature strong { display: block; margin: 8px 0; color: #0f172a; font-size: 18px; }
    .radar-placeholder { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 40px; text-align: center; margin: 30px 0; border: 2px solid #475569; }
    .radar-placeholder h3 { color: #0f172a; margin-bottom: 20px; }
    .radar-scores { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 25px; }
    .radar-score-item { background: white; padding: 20px; border-radius: 8px; border: 2px solid #e7e5e4; }
    .radar-score-item h4 { margin: 0 0 10px 0; color: #0f172a; font-size: 16px; }
    .radar-score-item .score { font-size: 32px; font-weight: bold; color: #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Frictiescan Resultaat</h1>
      <p>Uw persoonlijke analyse</p>
    </div>
    
    <div class="content">
      <div class="info-box">
        <strong>Bedrijf:</strong> ${bedrijfsnaam}<br>
        <strong>Naam:</strong> ${contactName}<br>
        <strong>Functie:</strong> ${functie}<br>
        <strong>Aantal medewerkers:</strong> ${aantalMedewerkers}<br>
        <strong>Datum:</strong> ${new Date().toLocaleDateString('nl-NL')}
      </div>

      <div class="score-card" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #475569;">
        <div class="score-header">
          <div class="score-title">Uw gemiddelde score</div>
          <div class="score-value" style="color: ${getScoreColor(gemiddeldeScore)}">${gemiddeldeScore}/5.0</div>
        </div>
        <div class="score-bar">
          <div class="score-fill" style="width: ${(gemiddeldeScore / 5) * 100}%; background-color: ${getScoreColor(gemiddeldeScore)};"></div>
        </div>
        <p style="margin-top: 20px; font-size: 15px; color: #0f172a;">
          Dit is uw eigen ervaring van de leiderschapssituatie binnen uw organisatie.
        </p>
      </div>

      <div class="radar-placeholder">
        <h3> Uw scores per domein</h3>
        <p style="color: #0f172a; margin-bottom: 20px;">Hier ziet u hoe u de verschillende aspecten van leiderschap ervaart:</p>
        <div class="radar-scores">`;

    domeinen.forEach(domein => {
      const score = getScore(domein.id);
      html += `
          <div class="radar-score-item">
            <h4>${domein.naam}</h4>
            <div class="score">${score}</div>
          </div>`;
    });

    html += `
        </div>
      </div>

      <h2 style="color: #0f172a; margin-top: 50px; font-size: 28px;">📋 Gedetailleerde scores</h2>
`;

    domeinen.forEach(domein => {
      const score = getScore(domein.id);
      const scoreColor = getScoreColor(score);

      html += `
      <div class="score-card">
        <div class="score-header">
          <div class="score-title">${domein.naam}</div>
          <div class="score-value" style="color: ${scoreColor}">${score}/5.0</div>
        </div>
        <div class="score-bar">
          <div class="score-fill" style="width: ${(score / 5) * 100}%; background-color: ${scoreColor};"></div>
        </div>
        <div class="interpretation">
          ${getScoreInterpretatie(score)}
        </div>
        
        <div style="margin-top: 20px;">
          <strong style="color: #0f172a; font-size: 16px;">Uw antwoorden op de stellingen:</strong>
          <div style="margin-top: 12px;">`;

      domein.stellingen.forEach(stelling => {
        const stellingScore = responses[stelling.id];
        html += `
            <div class="stelling-item">
              <span class="stelling-text">${stelling.tekst}</span>
              <span class="stelling-score" style="color: ${getScoreColor(stellingScore)}">${stellingScore}</span>
            </div>`;
      });

      html += `
          </div>
        </div>`;

      // Open vragen
      const heeftAntwoorden = domein.openVragen.some(v => openAnswers[v.id] && openAnswers[v.id].trim());
      
      if (heeftAntwoorden) {
        html += `
        <div class="open-vragen">
          <strong style="color: #0f172a; font-size: 16px; display: block; margin-bottom: 15px;">Uw reflecties:</strong>`;
        
        domein.openVragen.forEach(vraag => {
          const antwoord = openAnswers[vraag.id];
          if (antwoord && antwoord.trim()) {
            html += `
          <div class="open-vraag">
            <div class="open-vraag-label">${vraag.vraag}</div>
            <div class="open-vraag-antwoord">${antwoord}</div>
          </div>`;
          }
        });
        
        html += `
        </div>`;
      }

      html += `
      </div>`;
    });

    html += `
      <div class="belangrijke-boodschap">
        <h3>⚠️ Belangrijk: Dit is slechts de helft van het verhaal</h3>
        <p>
          <strong>Dit rapport toont uw eigen perspectief</strong> op de leiderschapssituatie. 
          Maar de werkelijkheid van uw medewerkers kan heel anders zijn.
        </p>
        <p>
          <strong>De grootste blinde vlekken ontstaan juist daar waar uw ervaring verschilt van die van uw team.</strong> 
          Wanneer u een score van 4 geeft op "autonomie" maar uw medewerkers geven een 2, dan zit daar frictie. 
          Die frictie kost energie, tijd, en uiteindelijk geld.
        </p>
        <p>
          <strong>Wilt u weten waar de echte frictie in uw organisatie zit?</strong><br>
          Dan is de volgende stap om uw medewerkers ook deze scan te laten invullen. 
          Pas dan krijgt u het complete beeld en kunnen wij u helpen met een gerichte analyse en concrete actiepunten.
        </p>
      </div>

      <div class="cta-section">
        <h3>🚀 Klaar voor de volgende stap?</h3>
        <p style="margin: 20px 0; font-size: 17px;">
          Laat uw medewerkers ook de scan invullen en ontdek waar de werkelijke frictie zit. 
          Wij helpen u met een professionele analyse en concrete verbeterplannen.
        </p>
        <a href="mailto:info@ruthgeruiterwijk.nl?subject=Frictiescan%20-%20Vervolggesprek&body=Beste%20Ruthger%2C%0D%0A%0D%0AIk%20heb%20de%20frictiescan%20ingevuld%20en%20wil%20graag%20de%20volgende%20stap%20zetten.%0D%0A%0D%0ABedrijf%3A%20${encodeURIComponent(bedrijfsnaam)}%0D%0ANaam%3A%20${encodeURIComponent(contactName)}%0D%0A%0D%0AGraag%20zou%20ik%20met%20u%20in%20gesprek%20gaan%20over%3A%0D%0A-%20Het%20laten%20invullen%20van%20de%20scan%20door%20mijn%20medewerkers%0D%0A-%20Een%20professionele%20analyse%20van%20de%20resultaten%0D%0A-%20Concrete%20vervolgstappen%0D%0A%0D%0AMet%20vriendelijke%20groet" class="cta-button">
          📧 Neem contact op voor vervolgtraject
        </a>
      </div>
    </div>

    <div class="footer">
      <div class="footer-signature">
        <p style="margin: 5px 0; color: #57534e;">Met vriendelijke groet,</p>
        <strong>Ruthger Uiterwijk</strong>
        <strong style="color: #0f172a;">Business Coach & Adviseur</strong>
      </div>
      <p style="font-size: 15px; color: #0f172a; margin: 20px 0;">
        <a href="https://www.ruthgeruiterwijk.nl" style="color: #0f172a; text-decoration: none; font-weight: 600;">www.ruthgeruiterwijk.nl</a><br>
        <a href="mailto:info@ruthgeruiterwijk.nl" style="color: #0f172a; text-decoration: none; font-weight: 600;">info@ruthgeruiterwijk.nl</a>
      </p>
      <p style="font-size: 13px; color: #a8a29e; margin-top: 25px;">
        Dit rapport is gegenereerd op ${new Date().toLocaleString('nl-NL')}
      </p>
    </div>
  </div>
</body>
</html>
`;

    return html;
  };

  const handleSubmit = async () => {
    if (!bedrijfsnaam || !contactName || !contactEmail || !functie || !aantalMedewerkers || !consent) {
      alert('Vul alle verplichte velden in en geef toestemming om te verzenden.');
      return;
    }

    if (!isScanCompleet()) {
      alert('Beantwoord eerst alle stellingen voordat u de scan verstuurt.');
      return;
    }

    setIsSubmitting(true);

    const domeinscores = {};
    domeinen.forEach(d => {
      domeinscores[d.id] = getScore(d.id);
    });

    // EmailJS configuratie
    const EMAILJS_SERVICE_ID = 'service_nebjm8o';
    const EMAILJS_TEMPLATE_ID = 'template_q9oaamh'; // Je moet deze template nog aanmaken
    const EMAILJS_PUBLIC_KEY = 'kgnlp3ATcUWA_btSC';

    const emailParams = {
      bedrijfsnaam: bedrijfsnaam,
      contactpersoon: contactName,
      email: contactEmail,
      telefoon: contactTelefoon || 'Niet opgegeven',
      functie: functie,
      aantal_medewerkers: aantalMedewerkers,
      gemiddelde_score: getGemiddeldeScore(),
      score_richting: domeinscores['richting'],
      score_autonomie: domeinscores['autonomie'],
      score_samenwerking: domeinscores['samenwerking'],
      score_erkenning: domeinscores['erkenning'],
      score_groei: domeinscores['groei'],
      rapport_html: generateHTMLRapport(),
      datum: new Date().toLocaleString('nl-NL')
    };

    // Getform payload (voor jullie notificaties)
    const getformPayload = {
      bedrijfsnaam: bedrijfsnaam,
      contactpersoon: contactName,
      email: contactEmail,
      telefoon: contactTelefoon || 'Niet opgegeven',
      functie: functie,
      aantal_medewerkers: aantalMedewerkers,
      gemiddelde_score: getGemiddeldeScore(),
      score_richting: domeinscores['richting'],
      score_autonomie: domeinscores['autonomie'],
      score_samenwerking: domeinscores['samenwerking'],
      score_erkenning: domeinscores['erkenning'],
      score_groei: domeinscores['groei'],
      rapport: generateHTMLRapport(),
      datum: new Date().toLocaleString('nl-NL')
    };

    try {
      // Stuur email via EmailJS
      const emailjs = (await import('@emailjs/browser')).default;
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
      );

      // Stuur naar Getform voor jullie administratie
      await fetch('https://getform.io/f/aqoexrxa', { // Vervang met jouw Getform ID
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(getformPayload),
      });

      setTimeout(() => {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
      
    } catch (error) {
      console.error('ERROR:', error);
      setIsSubmitting(false);
      alert('❌ Er ging iets mis bij het verzenden. Neem contact op via info@ruthgeruiterwijk.nl');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-2xl p-10 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-3"> Frictiescan voor Leiders</h1>
          <p className="text-slate-100 text-lg mb-6">
            Ontdek waar onzichtbare wrijving uw organisatie vertraagt
          </p>
          <div className="bg-slate-950/30 rounded-lg p-5 border border-slate-700/50">
            <p className="text-slate-50 leading-relaxed">
              Wanneer een bedrijf groeit, ontstaat er vaak frictie tussen wat u als leider <strong>denkt</strong> dat er gebeurt 
              en wat uw medewerkers <strong>ervaren</strong>. Deze scan brengt uw perspectief in kaart als eerste stap 
              naar het zichtbaar maken van die verborgen wrijving.
            </p>
          </div>
        </div>

        {/* Bedrijfsgegevens */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-2 border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Uw gegevens</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bedrijfsnaam *
              </label>
              <input
                type="text"
                value={bedrijfsnaam}
                onChange={(e) => setBedrijfsnaam(e.target.value)}
                placeholder="bijv. TechStart B.V."
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Uw naam *
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="bijv. Jan Jansen"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                E-mailadres *
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="info@bedrijf.nl"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Telefoonnummer (optioneel)
              </label>
              <input
                type="tel"
                value={contactTelefoon}
                onChange={(e) => setContactTelefoon(e.target.value)}
                placeholder="06-12345678"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Uw functie *
              </label>
              <input
                type="text"
                value={functie}
                onChange={(e) => setFunctie(e.target.value)}
                placeholder="bijv. Directeur / Manager"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Aantal medewerkers *
              </label>
              <select
                value={aantalMedewerkers}
                onChange={(e) => setAantalMedewerkers(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent"
                required
              >
                <option value="">Selecteer...</option>
                <option value="1-5">1-5 medewerkers</option>
                <option value="6-10">6-10 medewerkers</option>
                <option value="11-20">11-20 medewerkers</option>
                <option value="21-50">21-50 medewerkers</option>
                <option value="50+">50+ medewerkers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info box - Over deze frictiescan */}
        <div className="bg-slate-50 rounded-lg p-6 mb-6 border-2 border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Over deze frictiescan
          </h3>
          <div className="text-sm text-slate-900 space-y-3 leading-relaxed">
            <p>
              Deze scan is gebaseerd op vijf essentiële domeinen van effectief leiderschap: 
              <strong> richting & doelen, autonomie & vertrouwen, samenwerking & communicatie, 
              erkenning & waardering, en groei & ontwikkeling.</strong>
            </p>
            <p>
              <strong>Let op:</strong> Dit rapport toont alleen uw eigen perspectief. De werkelijke waarde ontstaat 
              wanneer u dit vergelijkt met hoe uw medewerkers dezelfde situatie ervaren. Daar worden de blinde vlekken zichtbaar.
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        {getGemiddeldeScore() !== null && (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-6 border-2 border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Uw voortgang</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-slate-700">Gemiddelde score</span>
                  <span className="font-bold text-2xl text-slate-800">{getGemiddeldeScore()}/5.0</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-6">
                  <div
                    className={'h-6 rounded-full transition-all duration-500 ' + getKleur(getGemiddeldeScore())}
                    style={{ width: (getGemiddeldeScore() / 5 * 100) + '%' }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              {isScanCompleet() ? (
                <p className="text-green-600 font-medium">✓ Alle stellingen beantwoord! Scroll naar beneden om te verzenden.</p>
              ) : (
                <p>Beantwoord alle stellingen om uw complete score te zien.</p>
              )}
            </div>
          </div>
        )}

        {/* Domeinen */}
        {domeinen.map((domein) => {
          const score = getScore(domein.id);
          return (
            <div key={domein.id} className="bg-white rounded-lg shadow-xl p-8 mb-6 border-2 border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{domein.naam}</h2>
                {score !== null && (
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-2xl text-slate-800">{score}</span>
                    <div className="w-32 bg-slate-200 rounded-full h-5">
                      <div
                        className={'h-5 rounded-full transition-all duration-500 ' + getKleur(score)}
                        style={{ width: (score / 5 * 100) + '%' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-5 rounded-lg mb-6 border-2 border-slate-200">
                <p className="text-sm text-slate-900 leading-relaxed">{domein.uitleg}</p>
              </div>

              {score !== null && (
                <div className={'mb-6 p-4 rounded-lg border-l-4 ' + 
                  (score >= 4 ? 'bg-slate-50 text-slate-900 border-slate-600' : 
                   score >= 3 ? 'bg-yellow-50 text-yellow-900 border-yellow-500' : 
                   score >= 2 ? 'bg-orange-50 text-orange-900 border-orange-500' : 
                   'bg-red-50 text-red-900 border-red-500')}>
                  <p className="text-sm font-semibold">{getScoreInterpretatie(score)}</p>
                </div>
              )}

              {/* Stellingen */}
              <div className="space-y-5 mb-8">
                <h3 className="font-bold text-slate-800 text-lg mb-4">Stellingen (1 = totaal oneens, 5 = helemaal eens)</h3>
                {domein.stellingen.map((stelling) => (
                  <div key={stelling.id} className="border-2 border-slate-200 rounded-lg p-5 bg-slate-50">
                    <p className="text-slate-800 mb-4 font-medium">{stelling.tekst}</p>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map((waarde) => (
                        <button
                          key={waarde}
                          onClick={() => handleResponse(stelling.id, waarde)}
                          className={'px-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center border-2 ' +
                            (responses[stelling.id] === waarde
                              ? 'bg-slate-700 text-white border-slate-800 shadow-lg scale-105'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-amber-400')}
                        >
                          {waarde}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Open vragen */}
              <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Reflectievragen (optioneel, maar waardevol!)</h3>
                <div className="space-y-5">
                  {domein.openVragen.map((vraag) => (
                    <div key={vraag.id}>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        {vraag.vraag}
                      </label>
                      <textarea
                        value={openAnswers[vraag.id] || ''}
                        onChange={(e) => handleOpenAnswer(vraag.id, e.target.value)}
                        placeholder="Typ hier uw antwoord..."
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-transparent bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Submit sectie */}
        {isScanCompleet() && !submitSuccess && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-6 border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Mail className="w-7 h-7" />
              Ontvang uw persoonlijke rapport
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              U heeft alle stellingen beantwoord! Klik hieronder om uw persoonlijke frictiescan-rapport 
              te ontvangen per email. U krijgt direct inzicht in uw eigen perspectief en concrete vervolgstappen.
            </p>

            <label className="flex items-start gap-3 mb-6 text-sm">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-5 h-5"
              />
              <span className="text-slate-700">
                Ik geef toestemming om deze scan en contactgegevens te gebruiken voor het versturen van mijn 
                rapport en eventuele opvolging. De gegevens worden vertrouwelijk behandeld. *
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={'flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold text-white text-lg transition w-full shadow-lg ' +
                (isSubmitting ? 'bg-stone-400 cursor-not-allowed' : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700')}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Bezig met verzenden...
                </>
              ) : (
                <>
                  <Mail className="w-6 h-6" />
                  Verstuur en ontvang rapport
                </>
              )}
            </button>
          </div>
        )}

        {/* Success message */}
        {submitSuccess && (
          <div className="bg-green-50 rounded-lg shadow-xl p-8 mb-6 border-2 border-green-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-green-900 mb-3">Rapport verzonden! ✓</h2>
              <p className="text-green-800 mb-4 text-lg">
                Bedankt voor het invullen van de frictiescan. Het rapport is verzonden naar <strong>{contactEmail}</strong>.
              </p>
              <div className="bg-slate-50 border-2 border-amber-300 rounded-lg p-6 mt-6">
                <p className="text-slate-900 font-semibold mb-3 text-lg">
                  📧 Check uw inbox (en spam folder)
                </p>
                <p className="text-slate-800 mb-4">
                  <strong>Volgende stap:</strong> In uw rapport leest u hoe u de volledige frictie-analyse kunt verkrijgen 
                  door ook uw medewerkers de scan te laten invullen. Zo krijgt u het complete beeld!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Frictiescan;
