const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors());

// Lista aggiornata simboli FTSE MIB (Maggio 2024) - verificata con Yahoo Finance
const ftseMibSymbols = [
  'A2A.MI','AMP.MI','AZM.MI','BAMI.MI','BMED.MI','BMPS.MI','BPE.MI','BZU.MI','CPR.MI','DIA.MI',
  'ENEL.MI','ENI.MI','ERG.MI','G.MI','ISP.MI','ITW.MI','LDO.MI','MONC.MI','NEXI.MI','PIRC.MI',
  'PRY.MI','RACE.MI','REC.MI','SFER.MI','SRG.MI','TEN.MI','TIT.MI','TRN.MI','UCG.MI','UNI.MI'
];

// Lista dei principali simboli USA (S&P 500)
const usaSymbols = [
  'AAPL', 'MSFT', 'AMZN', 'NVDA', 'GOOGL', 'META', 'BRK-B', 'JPM', 'JNJ', 'V',
  'PG', 'MA', 'HD', 'CVX', 'MRK', 'ABBV', 'PFE', 'KO', 'BAC', 'PEP',
  'COST', 'TMO', 'DHR', 'CSCO', 'VZ', 'ADBE', 'CRM', 'CMCSA', 'NEE', 'INTC'
];

// Funzione per recuperare i dati
async function fetchQuotes(symbols, sort) {
  const results = [];
  
  for (const symbol of symbols) {
    try {
      console.log(`[DEBUG] Recupero dati per ${symbol}...`);
      const q = await yahooFinance.quote(symbol);
      
      if (q && q.regularMarketPrice) {
        const result = {
          nome: q.shortName || q.symbol,
          simbolo: q.symbol,
          ultimo: q.regularMarketPrice,
          massimo: q.regularMarketDayHigh,
          minimo: q.regularMarketDayLow,
          varPercent: q.regularMarketChangePercent,
          volume: q.regularMarketVolume,
          ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        
        results.push(result);
      }
    } catch (e) {
      console.log(`[ERROR] Errore per ${symbol}:`, e.message);
    }
  }
  
  // Ordina i risultati
  let sorted;
  if (sort === 'vol') {
    sorted = results
      .filter(x => x.volume != null)
      .sort((a, b) => (b.volume || 0) - (a.volume || 0));
  } else {
    sorted = results
      .filter(x => x.varPercent != null)
      .sort((a, b) => (b.varPercent || 0) - (a.varPercent || 0));
  }
  
  return sorted.slice(0, 10);
}

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
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/us30', async (req, res) => {
  try {
    const result = await yahooFinance.quote('YM=F'); // Dow Jones Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/nasdaq100', async (req, res) => {
  try {
    const result = await yahooFinance.quote('NQ=F'); // Nasdaq 100 Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/us2000', async (req, res) => {
  try {
    const result = await yahooFinance.quote('RTY=F'); // Russell 2000 Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/vix', async (req, res) => {
  try {
    const result = await yahooFinance.quote('VX=F'); // VIX Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/eurostoxx50', async (req, res) => {
  try {
    const result = await yahooFinance.quote('STXE.MI'); // Simbolo alternativo per Euro Stoxx 50
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ftse100', async (req, res) => {
  try {
    const result = await yahooFinance.quote('Z=F'); // Simbolo alternativo per FTSE 100 Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/smi', async (req, res) => {
  try {
    const result = await yahooFinance.quote('SMI=F'); // Simbolo alternativo per SMI Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/ibex35', async (req, res) => {
  try {
    const result = await yahooFinance.quote('IBEX.MC'); // Simbolo alternativo per IBEX 35 Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/cac40', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FCE.PA'); // Simbolo alternativo per CAC 40 Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

app.get('/api/futures/dax', async (req, res) => {
  try {
    const result = await yahooFinance.quote('FDAX.DE'); // Simbolo alternativo per DAX Future
    res.json({
      ...result,
      ora: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
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

// Rotta per dati storici di un indice/future
app.get('/api/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log(`[DEBUG] Richiesta dati storici per ${symbol}`);
    
    // Recupera dati daily degli ultimi 6 mesi
    const to = new Date();
    const from = new Date();
    from.setMonth(to.getMonth() - 6);
    
    console.log(`[DEBUG] Periodo richiesto: da ${from.toISOString()} a ${to.toISOString()}`);
    
    // Prova prima con il simbolo originale
    let result = await yahooFinance.chart(symbol, {
      period1: from,
      period2: to,
      interval: '1d',
    });
    
    // Se non ci sono dati, prova con il simbolo senza il prefisso ^
    if (!result || !result.quotes || result.quotes.length === 0) {
      console.log(`[DEBUG] Nessun dato trovato per ${symbol}, provo senza prefisso ^`);
      const cleanSymbol = symbol.replace('^', '');
      result = await yahooFinance.chart(cleanSymbol, {
        period1: from,
        period2: to,
        interval: '1d',
      });
    }
    
    console.log(`[DEBUG] Risultato Yahoo Finance:`, result);
    
    if (!result || !result.quotes || !Array.isArray(result.quotes)) {
      throw new Error('Formato dati non valido');
    }
    
    // Trasforma i dati nel formato richiesto dal frontend
    const formattedData = result.quotes
      .filter(quote => quote && quote.date && quote.close)
      .map(quote => ({
        date: new Date(quote.date).toISOString().split('T')[0],
        close: parseFloat(quote.close)
      }))
      .filter(d => !isNaN(d.close));
    
    console.log(`[DEBUG] Dati formattati:`, formattedData);
    
    if (formattedData.length === 0) {
      // Se ancora non ci sono dati, prova con un periodo più breve
      console.log(`[DEBUG] Nessun dato valido trovato, provo con periodo più breve`);
      from.setMonth(to.getMonth() - 1); // Ultimo mese invece di 6 mesi
      
      result = await yahooFinance.chart(symbol, {
        period1: from,
        period2: to,
        interval: '1d',
      });
      
      if (!result || !result.quotes || !Array.isArray(result.quotes)) {
        throw new Error('Formato dati non valido');
      }
      
      const shortTermData = result.quotes
        .filter(quote => quote && quote.date && quote.close)
        .map(quote => ({
          date: new Date(quote.date).toISOString().split('T')[0],
          close: parseFloat(quote.close)
        }))
        .filter(d => !isNaN(d.close));
      
      if (shortTermData.length === 0) {
        throw new Error('Nessun dato valido trovato');
      }
      
      res.json(shortTermData);
    } else {
      res.json(formattedData);
    }
  } catch (error) {
    console.error(`[ERROR] Errore nel recupero dati storici:`, error);
    res.status(500).json({ 
      error: 'Errore nel recupero dati storici', 
      details: error.message,
      symbol: req.params.symbol
    });
  }
});

app.get('/api/top10italia', async (req, res) => {
  const sort = req.query.sort === 'vol' ? 'vol' : 'var';
  console.log(`[DEBUG] Richiesta top10italia con sort=${sort}`);
  
  try {
    const top10 = await fetchQuotes(ftseMibSymbols, sort);
    console.log(`[DEBUG] Risultati finali: ${top10.length}`);
    res.json(top10);
  } catch (error) {
    console.error(`[ERROR] Errore completo:`, error);
    res.status(500).json({ error: 'Errore nel recupero dati top 10 Italia' });
  }
});

app.get('/api/top10usa', async (req, res) => {
  const sort = req.query.sort === 'vol' ? 'vol' : 'var';
  console.log(`[DEBUG] Richiesta top10usa con sort=${sort}`);
  
  try {
    const top10 = await fetchQuotes(usaSymbols, sort);
    console.log(`[DEBUG] Risultati finali: ${top10.length}`);
    res.json(top10);
  } catch (error) {
    console.error(`[ERROR] Errore completo:`, error);
    res.status(500).json({ error: 'Errore nel recupero dati top 10 USA' });
  }
});

app.listen(3001, () => {
  console.log('Backend avviato su http://localhost:3001');
});
