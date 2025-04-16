import { useState, useEffect } from 'react';
import { Search, Loader } from 'lucide-react';

const StarshipsList = () => {
  const [starships, setStarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [error, setError] = useState(null);

  // İlk veri yüklemesi
  useEffect(() => {
    fetchStarships('https://swapi.dev/api/starships/');
  }, []);

  // Starships verilerini API'den çeker
  const fetchStarships = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Veri alınamadı');
      }
      
      const data = await response.json();
      
      // Eğer ilk sayfa ise veriyi direkt ata, değilse mevcut veriye ekle
      if (url === 'https://swapi.dev/api/starships/') {
        setStarships(data.results);
      } else {
        setStarships(prevStarships => [...prevStarships, ...data.results]);
      }
      
      setNextPage(data.next);
      setError(null);
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Arama işlemi
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      // Boş arama ise ilk sayfayı göster
      fetchStarships('https://swapi.dev/api/starships/');
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`https://swapi.dev/api/starships/?search=${searchQuery}`);
      
      if (!response.ok) {
        throw new Error('Arama sonuçları alınamadı');
      }
      
      const data = await response.json();
      setStarships(data.results);
      setNextPage(data.next);
      setError(null);
    } catch (err) {
      setError('Arama yapılırken bir hata oluştu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Daha fazla yıldız gemisi yükle
  const loadMore = () => {
    if (nextPage) {
      fetchStarships(nextPage);
    }
  };

  // Gemiyi listelemek için renk ve hız bilgisini hesapla
  const getSpeedColor = (speed) => {
    if (speed === 'n/a' || speed === 'unknown') return 'text-gray-400';
    const numSpeed = parseInt(speed.replace(/,/g, ''));
    if (numSpeed >= 1000) return 'text-green-500';
    if (numSpeed >= 500) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">Star Wars Starships</h1>
      
      {/* Arama formu */}
      <form onSubmit={handleSearch} className="mb-8 flex items-center justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Gemi adı veya modeli ara..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button type="submit" className="absolute right-3 top-3 text-gray-500 hover:text-yellow-500">
            <Search size={20} />
          </button>
        </div>
      </form>
      
      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Yıldız gemileri listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {starships.map((ship, index) => (
          <a 
            href={`/starship/${ship.url.split('/').filter(segment => segment).pop()}`}
            key={index} 
            className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-2">{ship.name}</h2>
              <p className="text-gray-300 mb-1"><span className="font-semibold">Model:</span> {ship.model}</p>
              <p className={`mb-1 ${getSpeedColor(ship.max_atmosphering_speed)}`}>
                <span className="font-semibold">Hız:</span> {ship.max_atmosphering_speed}
              </p>
              <p className="text-gray-300 mb-1"><span className="font-semibold">Üretici:</span> {ship.manufacturer}</p>
            </div>
          </a>
        ))}
      </div>
      
      {/* Yükleniyor göstergesi veya daha fazla butonu */}
      <div className="mt-8 text-center">
        {loading ? (
          <div className="flex justify-center">
            <Loader className="animate-spin text-yellow-400" size={30} />
          </div>
        ) : nextPage ? (
          <button 
            onClick={loadMore} 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg"
          >
            Daha Fazla Yükle
          </button>
        ) : starships.length > 0 ? (
          <p className="text-gray-400">Tüm gemiler gösteriliyor</p>
        ) : (
          <p className="text-gray-400">Sonuç bulunamadı</p>
        )}
      </div>
    </div>
  );
};

export default StarshipsList;