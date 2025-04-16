import React, { useState, useEffect } from 'react';
import { Search, Loader, ArrowLeft } from 'lucide-react';
import './App.css';

// Ana uygulama bileşeni
const App = () => {
  const [selectedStarshipId, setSelectedStarshipId] = useState(null);
  
  // Gemi seçildiğinde çağrılır
  const handleSelectStarship = (id) => {
    setSelectedStarshipId(id);
    // Sayfanın en üstüne kaydır
    window.scrollTo(0, 0);
  };
  
  // Ana sayfaya dön
  const handleBackToList = () => {
    setSelectedStarshipId(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {selectedStarshipId ? (
        <StarshipDetail id={selectedStarshipId} onBack={handleBackToList} />
      ) : (
        <StarshipsList onSelectStarship={handleSelectStarship} />
      )}
    </div>
  );
};

// Yıldız gemileri listesi bileşeni
const StarshipsList = ({ onSelectStarship }) => {
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
    if (isNaN(numSpeed)) return 'text-gray-400';
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
          <div 
            key={index} 
            className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => onSelectStarship(ship.url.split('/').filter(segment => segment).pop())}
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-2">{ship.name}</h2>
              <p className="text-gray-300 mb-1"><span className="font-semibold">Model:</span> {ship.model}</p>
              <p className={`mb-1 ${getSpeedColor(ship.max_atmosphering_speed)}`}>
                <span className="font-semibold">Hız:</span> {ship.max_atmosphering_speed}
              </p>
              <p className="text-gray-300 mb-1"><span className="font-semibold">Üretici:</span> {ship.manufacturer}</p>
            </div>
          </div>
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

// Yıldız gemisi detay bileşeni
const StarshipDetail = ({ id, onBack }) => {
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStarshipDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
        
        if (!response.ok) {
          throw new Error('Yıldız gemisi bilgileri alınamadı');
        }
        
        const data = await response.json();
        setStarship(data);
        setError(null);
      } catch (err) {
        setError('Yıldız gemisi detayları yüklenirken bir hata oluştu: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStarshipDetails();
  }, [id]);

  // Formatlanmış değer gösterimi
  const formatValue = (value) => {
    return value === 'unknown' || value === 'n/a' ? 'Bilinmiyor' : value;
  };

  // Boyut değerini formatla
  const formatSize = (value) => {
    if (value === 'unknown' || value === 'n/a') return 'Bilinmiyor';
    
    // Sayı olup olmadığını kontrol et
    const numValue = parseFloat(value.replace(/,/g, ''));
    if (isNaN(numValue)) return value;
    
    // Büyük değerler için formatla
    if (numValue >= 1000) {
      return `${(numValue / 1000).toFixed(1)} km`;
    }
    return `${value} m`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-yellow-400" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center mb-6 text-yellow-400 hover:text-yellow-500"
        >
          <ArrowLeft size={20} className="mr-2" />
          Listeye Dön
        </button>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!starship) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Geri dön butonu */}
      <button 
        onClick={onBack}
        className="flex items-center mb-6 text-yellow-400 hover:text-yellow-500"
      >
        <ArrowLeft size={20} className="mr-2" />
        Listeye Dön
      </button>
      
      {/* Gemi detayları */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6">{starship.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Model</h2>
                <p className="text-white text-xl">{formatValue(starship.model)}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Üretici</h2>
                <p className="text-white text-xl">{formatValue(starship.manufacturer)}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Fiyat</h2>
                <p className="text-white text-xl">
                  {starship.cost_in_credits === 'unknown' ? 'Bilinmiyor' : `${parseInt(starship.cost_in_credits).toLocaleString()} kredi`}
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Uzunluk</h2>
                <p className="text-white text-xl">{formatSize(starship.length)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Maksimum Atmosferik Hız</h2>
                <p className="text-white text-xl">{formatValue(starship.max_atmosphering_speed)}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Mürettebat</h2>
                <p className="text-white text-xl">{formatValue(starship.crew)}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Yolcu Kapasitesi</h2>
                <p className="text-white text-xl">{formatValue(starship.passengers)}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-300">Kargo Kapasitesi</h2>
                <p className="text-white text-xl">
                  {starship.cargo_capacity === 'unknown' ? 'Bilinmiyor' : `${parseInt(starship.cargo_capacity).toLocaleString()} kg`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Hiperuzay Yetenek Sınıfı</h2>
            <p className="text-white text-xl">{formatValue(starship.hyperdrive_rating)}</p>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Sınıf</h2>
            <p className="text-white text-xl">{formatValue(starship.starship_class)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;