import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Admin() {
  const [userName, setUserName] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (!user) {
      router.push('/login');
      return;
    }
    setUserName(user);

    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches));
    }
  }, [router]);

  const calculatePoints = (prediction: any, actual: [number, number]) => {
    const [pred1, pred2] = [prediction.score1, prediction.score2];
    const [act1, act2] = actual;

    // Score exact: 5 points
    if (pred1 === act1 && pred2 === act2) return 5;
    
    // Bon vainqueur: 2 points
    if ((pred1 > pred2 && act1 > act2) || (pred1 < pred2 && act1 < act2) || (pred1 === pred2 && act1 === act2)) {
      return 2;
    }
    
    return 0;
  };

  const handleResult = (matchId: string, score1: number, score2: number) => {
    if (!confirm(`Confirmer le résultat : ${score1} - ${score2} ?\n\nLes points seront calculés pour tous les participants.`)) {
      return;
    }

    // Mettre à jour le match
    const updatedMatches = matches.map(m => 
      m.id === matchId ? { ...m, score1, score2, finished: true } : m
    );
    localStorage.setItem('matches', JSON.stringify(updatedMatches));
    setMatches(updatedMatches);

    // Calculer les points pour tous les utilisateurs
    const predictions = JSON.parse(localStorage.getItem('predictions') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    Object.keys(predictions).forEach(userName => {
      if (predictions[userName][matchId]) {
        const points = calculatePoints(predictions[userName][matchId], [score1, score2]);
        users[userName].points = (users[userName].points || 0) + points;
      }
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Résultat enregistré ! Les points ont été calculés pour tous les participants.');
  };

  return (
    <>
      <Head>
        <title>Administration | Molliet Lauper SA</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-4xl">⚽</span>
              <span className="text-xl font-bold text-amber-400">Molliet Lauper SA</span>
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/matches" className="text-slate-400 hover:text-white">Matchs</Link>
              <Link href="/leaderboard" className="text-slate-400 hover:text-white">Classement</Link>
              <Link href="/admin" className="text-amber-400 font-semibold">Admin</Link>
              <span className="text-slate-400">👤 {userName}</span>
            </div>
          </nav>
        </header>

        <div className="pt-24 pb-12 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-black text-white mb-4 text-center">⚙️ Panel d'administration</h1>
            <p className="text-slate-400 text-center mb-12">Entrez les résultats des matchs terminés</p>

            <div className="space-y-6">
              {matches.map((match) => (
                <div key={match.id} className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
                  {/* Match Header */}
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                    <span className="text-amber-400 font-semibold">{match.stage} - Groupe {match.group}</span>
                    <span className="text-slate-400">{match.date} à {match.time}</span>
                    {match.finished && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                        ✅ Terminé
                      </span>
                    )}
                  </div>

                  {/* Teams */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
                    <div className="text-xl font-bold text-white text-center md:text-left">
                      {match.flag1} {match.team1}
                    </div>
                    <div className="text-center text-3xl text-slate-600 font-bold">VS</div>
                    <div className="text-xl font-bold text-white text-center md:text-right">
                      {match.team2} {match.flag2}
                    </div>
                  </div>

                  {/* Admin Form */}
                  <div className="border-t border-slate-700 pt-6">
                    <h4 className="text-white font-semibold mb-4">Entrer le résultat :</h4>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const score1 = parseInt(formData.get('score1') as string);
                        const score2 = parseInt(formData.get('score2') as string);
                        handleResult(match.id, score1, score2);
                      }}
                      className="flex gap-4 items-center flex-wrap"
                    >
                      <input
                        type="number"
                        name="score1"
                        min="0"
                        max="20"
                        defaultValue={match.score1 ?? ''}
                        placeholder={`Score ${match.team1}`}
                        className="w-20 h-20 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-2xl font-bold text-center focus:outline-none focus:border-amber-400"
                        required
                      />
                      <span className="text-2xl text-slate-600 font-bold">-</span>
                      <input
                        type="number"
                        name="score2"
                        min="0"
                        max="20"
                        defaultValue={match.score2 ?? ''}
                        placeholder={`Score ${match.team2}`}
                        className="w-20 h-20 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-2xl font-bold text-center focus:outline-none focus:border-amber-400"
                        required
                      />
                      <button
                        type="submit"
                        className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
                      >
                        {match.finished ? 'Modifier' : 'Valider'} le résultat
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>

            {/* Info box */}
            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl">
              <h3 className="text-white font-bold mb-2">ℹ️ Système de points</h3>
              <ul className="text-slate-300 space-y-1">
                <li>• <strong className="text-amber-400">Score exact :</strong> 5 points</li>
                <li>• <strong className="text-blue-400">Bon vainqueur :</strong> 2 points</li>
                <li>• <strong className="text-slate-400">Mauvais pronostic :</strong> 0 point</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
