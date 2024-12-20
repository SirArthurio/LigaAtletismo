import React, {useState,useEffect}from "react";
import { MNoticias } from "../../components/MNoticias";
import imagen1 from "../../assets/login/liga.png";
import { obtenerNoticias } from "../../API/Data";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      const data = await obtenerNoticias();
      setNoticias(data);
    };

    fetchNoticias();
  }, []);
  return (
    <div>
      <div className="h-1/3	m-4 p-4 bg-emerald-100 rounded-lg">
        <h2 className="text-3xl text-center mt-2 pt-2">NOTICIAS</h2>
      </div>
      <div className="flex flex-col">
        <div className="justify-center h-1/4 w-1/4">
          <img src={imagen1} alt="Liga" />
        </div>
        <div className="bg-emerald-100 p-6">
          {noticias.length > 0 ? (
            noticias.map((item, index) => (
              <MNoticias item={item} key={item.id} index={index} />
            ))
          ) : (
            <p className="text-center">
              No hay noticias disponibles en este momento.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
