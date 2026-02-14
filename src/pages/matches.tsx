import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

interface Match {
  id: string;
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  date: string;
  time: string;
  stage: string;
  group: string;
  score1: number | null;
  score2: number | null;
  finished: boolean;
}

export default function Matches() {
  const [userName, setUserName] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (!user) {
      router.push('/login');
      return;
    }
    setUserName(user);

    const storedMatches = localStorage.getItem('matches');
    if (!storedMatches) {
      const defaultMatches: Match[] = [
        {
          id: '1',
          team1: 'Canada',
          team2: 'Mexique',
          flag1: '🇨🇦',
          flag2: '🇲🇽',
          date: '2026-06-11',
          time: '20:00',
          stage: 'Phase de groupes',
          group: 'A',
          score1: null,
          score2: null,
          finished: false
        },
        {
          id: '2',
          team1: 'États-Unis',
          team2: 'Argentine',
          flag1: '🇺🇸',
          flag2: '🇦🇷',
          date: '2026-06-12',
          time: '17:00',
          stage: 'Phase de groupes',
          group: 'B',
          score1: null,
          score2: null,
          finished: false
        },
        {
          id: '3',
          team1: 'France',
          team2: 'Brésil',
          flag1: '🇫🇷',
          flag2: '🇧🇷',
          date: '2026-06-13',
          time: '18:00',
          stage: 'Phase de groupes',
          group: 'C',
          score1: null,
          score2: null,
          finished: false
        },
        {
          id: '4',
          team1: 'Allemagne',
          team2: 'Espagne',
          flag1: '🇩🇪',
          flag2: '🇪🇸',
          date: '2026-06-14',
          time: '21:00',
          stage: 'Phase de groupes',
          group: 'D',
          score1: null,
          score2: null,
          finished: false
        },
        {
          id: '5',
          team1: 'Angleterre',
          team2: 'Italie',
          flag1: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
          flag2: '🇮🇹',
          date: '2026-06-15',
          time: '19:00',
          stage: 'Phase de groupes',
          group: 'E',
          score1: null,
          score2: null,
          finished: false
        }
      ];
      localStorage.setItem('matches', JSON.stringify(defaultMatches));
      setMatches(defaultMatches);
    } else {
      setMatches(JSON.parse(storedMatches));
    }

    const storedPredictions = localStorage.getItem('predictions');
    if (storedPredictions) {
      setPredictions(JSON.parse(storedPredictions));
    }
  }, [router]);

  const handlePrediction = (matchId: string, score1: number, score2: number) => {
    const allPredictions = JSON.parse(localStorage.getItem('predictions') || '{}');
    
    if (!allPredictions[userName]) {
      allPredictions[userName] = {};
    }
    
    allPredictions[userName][matchId] = {
      score1,
      score2,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('predictions', JSON.stringify(allPredictions));
    setPredictions(allPredictions);

    // Mettre à jour le compteur
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[userName]) {
      users[userName].predictions_count = Object.keys(allPredictions[userName]).length;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    alert('✅ Pronostic enregistré avec succès !');
  };

  return (
    <>
      <Head>
        <title>Matchs | Molliet Lauper SA</title>
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
              <Link href="/matches" className="text-amber-400 font-semibold">Matchs</Link>
              <Link href="/leaderboard" className="text-slate-400 hover:text-white">Classement</Link>
              <Link href="/admin" className="text-slate-400 hover:text-white">Admin</Link>
              <span className="text-slate-400">👤 {userName}</span>
            </div>
          </nav>
        </header>

        <div className="pt-24 pb-12 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-black text-white mb-12 text-center">⚽ Matchs de la Coupe du Monde</h1>

            <div className="space-y-6">
              {matches.map((match) => {
                const userPrediction = predictions[userName]?.[match.id];
                
                return (
                  <div key={match.id} className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
                    {/* Match Header */}
                    <div className="flex justify-between items-center mb-6 text-sm flex-wrap gap-2">
                      <span className="text-amber-400 font-semibold">{match.stage} - Groupe {match.group}</span>
                      <span className="text-slate-400">📅 {match.date} à {match.time}</span>
                    </div>

                    {/* Teams */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <span className="text-5xl">{match.flag1}</span>
                        <span className="text-xl font-bold text-white">{match.team1}</span>
                      </div>
                      
                      <div className="text-center">
                        {match.finished ? (
                          <span className="text-4xl font-black text-amber-400">{match.score1} - {match.score2}</span>
                        ) : (
                          <span className="text-3xl text-slate-600 font-bold">VS</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 justify-center md:justify-end">
                        <span className="text-xl font-bold text-white">{match.team2}</span>
                        <span className="text-5xl">{match.flag2}</span>
                      </div>
                    </div>

                    {/* Prediction Form */}
                    {!match.finished && (
                      <div className="border-t border-slate-700 pt-6">
                        <h4 className="text-white font-semibold mb-4">Votre pronostic :</h4>
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const score1 = parseInt(formData.get('score1') as string);
                            const score2 = parseInt(formData.get('score2') as string);
                            handlePrediction(match.id, score1, score2);
                          }}
                          className="flex gap-4 items-center flex-wrap"
                        >
                          <input
                            type="number"
                            name="score1"
                            min="0"
                            max="20"
                            defaultValue={userPrediction?.score1 || ''}
                            placeholder="0"
                            className="w-20 h-20 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-2xl font-bold text-center focus:outline-none focus:border-amber-400"
                            required
                          />
                          <span className="text-2xl text-slate-600 font-bold">-</span>
                          <input
                            type="number"
                            name="score2"
                            min="0"
                            max="20"
                            defaultValue={userPrediction?.score2 || ''}
                            placeholder="0"
                            className="w-20 h-20 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-2xl font-bold text-center focus:outline-none focus:border-amber-400"
                            required
                          />
                          <button
                            type="submit"
                            className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform"
                          >
                            {userPrediction ? 'Modifier' : 'Valider'} mon pronostic
                          </button>
                        </form>
                      </div>
                    )}

                    {/* Result */}
                    {match.finished && (
                      <div className="border-t border-slate-700 pt-6">
                        {userPrediction ? (
                          <p className="text-slate-400">Votre pronostic : {userPrediction.score1} - {userPrediction.score2}</p>
                        ) : (
                          <p className="text-slate-500">Vous n'avez pas fait de pronostic</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
