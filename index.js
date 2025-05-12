const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
app.use(cors());

// Indici Europei
app.get('/api/cac40', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^FCHI');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/dax40', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^GDAXI');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/ftse100', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^FTSE');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/smi', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^SSMI');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/ftsemib', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FTSEMIB.MI');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/aex', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^AEX');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/bel20', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^BFX');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/psi20', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^PSI20');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/ibex35', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^IBEX');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/ftse250', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^FTMC');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

// Indici USA
app.get('/api/sp500', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^GSPC');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/dowjones', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^DJI');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/nasdaq', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^IXIC');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

// Indici Asiatici
app.get('/api/nikkei', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^N225');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/hangseng', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^HSI');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

// S&P 500 VIX (USA)
app.get('/api/vix', async (req, res) => {
  try {
    const result = await yahooFinance.quote('^VIX');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

// Futures principali
app.get('/api/futures/us500', async (req, res) => {
  try {
    const result = await yahooFinance.quote('ES=F'); // S&P 500 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/us30', async (req, res) => {
  try {
    const result = await yahooFinance.quote('YM=F'); // Dow Jones Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/nasdaq100', async (req, res) => {
  try {
    const result = await yahooFinance.quote('NQ=F'); // Nasdaq 100 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/us2000', async (req, res) => {
  try {
    const result = await yahooFinance.quote('RTY=F'); // Russell 2000 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/vix', async (req, res) => {
  try {
    const result = await yahooFinance.quote('VX=F'); // VIX Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/eurostoxx50', async (req, res) => {
  try {
    const result = await yahooFinance.quote('STXE.MI'); // Simbolo alternativo per Euro Stoxx 50
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ftse100', async (req, res) => {
  try {
    const result = await yahooFinance.quote('Z=F'); // Simbolo alternativo per FTSE 100 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/smi', async (req, res) => {
  try {
    const result = await yahooFinance.quote('SMI=F'); // Simbolo alternativo per SMI Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ibex35', async (req, res) => {
  try {
    const result = await yahooFinance.quote('IBEX.MC'); // Simbolo alternativo per IBEX 35 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/cac40', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FCE.PA'); // Simbolo alternativo per CAC 40 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/dax', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FDAX.DE'); // Simbolo alternativo per DAX Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ftse100', async (req, res) => {
  try {
    const result = await yahooFinance.quote('Z.F'); // FTSE 100 Future (simbolo alternativo: 'Z=F')
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/eurostoxx50', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FESX.F'); // Euro Stoxx 50 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/smi', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FSMI.SW'); // SMI Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ibex35', async (req, res) => {
  try {
    const result = await yahooFinance.quote('IBEX.MC'); // IBEX 35 Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ftsemib', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FTSEMIB.MI'); // FTSE MIB Future
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.listen(3001, () => {
  console.log('Backend avviato su http://localhost:3001');
});
