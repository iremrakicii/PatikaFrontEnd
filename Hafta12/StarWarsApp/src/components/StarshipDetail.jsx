import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';

const StarshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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

  // Geri dön butonu
  const handleGoBack = () => {
    navigate('/');
  };

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
          onClick={handleGoBack}
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
        onClick={handleGoBack}
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

export default StarshipDetail;