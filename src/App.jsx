import { useEffect, useState } from 'react'
import arrowIcon from './assets/assets/icon-arrow.svg'
import Map from './components/map';

function App() {
  const [ipAddress, setIpAddress] = useState(null);
  const [searchedIpAddress, setSearchedIpAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [ISP, setISP] = useState(null);

  const ipSearched = async (ip) => {
    const apiKey = import.meta.env.VITE_IP_GEOLOCATION_API_KEY;

    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ip}&domain=${ip}`)
      const data = await response.json();
      
      setSearchedIpAddress(data.ip)
      setLocation(data.location.region)
      setTimezone(data.location.timezone)
      setISP(data.isp)
    } catch (error) {
      alert('Error fetching data from this IP address')
      console.error('Error fetching data from this IP address:', error);
    }
  }

  useEffect(() => {},)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip)
      } catch (error) {
        alert('Error fetching user IP address')
        console.error('Error fetching user IP address:', error);
      }
    };
  
    fetchData();

  }, []);

  useEffect(() => {
    ipSearched(ipAddress)
  }, [ipAddress]);

  const handleSubmit = (e, ip) => {
    e.preventDefault();
  
    if (ipAddress.length < 3) {
      alert('Please enter a valid IP address or domain');
      return; // Return or add logic for handling invalid input
    }
  
    ipSearched(ip);
  }
  
  

  return (
    <main>
      <section className="flex flex-col">
        <div className='header h-52 flex flex-col justify-center items-center gap-4'>
          <h1 className='text-xl font-semibold text-Very-Light-Gray sm:text-4xl'>IP Address Tracker</h1>

          <form action="" className='flex pb-8'>
            <input defaultValue={ipAddress} onChange={e => setSearchedIpAddress(e.target.value)} type="text" placeholder='Search for any IP address or domain' className='rounded-l-lg w-52 h-9 p-4 placeholder:text-xs sm:w-96 focus:outline-none'/>
            <button type='submit' className='flex flex-row justify-center items-center bg-Very-Dark-Gray w-6 rounded-r-lg hover:bg-Dark-Gray sm:w-9' onClick={(e) => handleSubmit(e, searchedIpAddress)}>
              <img src={arrowIcon} className='w-2' alt="" />
            </button>
          </form>
        </div>

        <div className='headers flex justify-center'>

          <div className='rounded-lg bg-Very-Light-Gray w-60 h-fit sm:w-fit sm:flex-row sm:gap-0 sm:py-3 sm:-top-12 relative -top-16 flex flex-col items-center gap-3 py-2 z-50'>
            <div className='flex flex-col items-center sm:items-start gap-1 sm:border-r-2 sm:border-Dark-Gray sm:w-[9.8rem] md:w-[12rem] sm:px-2 sm:h-20 sm:justify-between'>
              <h5 className='text-xs font-thin opacity-80'>IP Address</h5>

              <p className=' text-lg font-semibold'>{ipAddress}</p>
            </div>

            <div className='flex flex-col items-center sm:items-start gap-1 sm:border-r-2 sm:border-Dark-Gray sm:w-[9.8rem] md:w-[12rem] sm:px-2 sm:h-20 sm:justify-between'>
              <h5 className='text-xs font-thin opacity-80'>Location</h5>

              <p className=' text-lg font-semibold'>{location}</p>
            </div>

            <div className='flex flex-col items-center sm:items-start gap-1 sm:border-r-2 sm:border-Dark-Gray sm:w-[9.8rem] md:w-[12rem] sm:px-2 sm:h-20 sm:justify-between'>
              <h5 className='text-xs font-thin opacity-80'>Timezone</h5>

              <p className=' text-lg font-semibold'>{timezone}</p>
            </div>
            
            <div className='flex flex-col items-center sm:items-start gap-1 sm:w-[9.8rem] md:w-[12rem] sm:px-2 sm:h-20 sm:justify-between'>
              <h5 className='text-xs font-thin opacity-80'>ISP</h5>

              <p className=' text-lg font-semibold text-center sm:text-left'>{ISP}</p>
            </div>
          </div>

          <div className="map z-10">
            <Map location={location} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App