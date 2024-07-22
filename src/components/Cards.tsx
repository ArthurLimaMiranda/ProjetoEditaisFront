import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import finep from "../../public/images/FINEP.png";
import facepe from "../../public/images/Marca-FACEPE.png";
import { VerMais } from "./VerMais";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { getEditaisFavoritos, setEditalFavorito } from "@/lib/api";
import { AuthContext } from "@/app/contexts/AuthContext";

type User = {
  id: number;
  login: string;
  nome: string;
  idPerfil: number;
  senha: string;
};

interface Card {
  id: number;
  nome: string;
  categoria: string;
  publicoAlvo: string;
  area: string;
  dataPublicacao: string;
  dataInicial: string;
  dataFinal: string;
  resultado: string;
  idOrgaoFomento: number;
  criadoPorBot: boolean;
  link: string;
}

interface CardsProps {
  id: number;
  nome: string;
  categoria: string;
  publicoAlvo: string;
  area: string;
  dataPublicacao: string;
  dataInicial: string;
  dataFinal: string;
  resultado: string;
  idOrgaoFomento: number;
  idUsuario: number;
  criadoPorBot: boolean;
  link: string;
  logged: boolean;
  filteredCards: Card[];
  setFilteredCards: Function;
  user: User | null
}

export function CardsGrid(props: CardsProps) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [editais, setEditais] = useState([]);

  const userInfo = useContext(AuthContext).user;

  const handleFavoriteClick = async () => {
    try {
      await setEditalFavorito(userInfo.id, props.id);
      setFavorited(true);
      console.log("Edital favoritado.");
    } catch (error) {
      console.error("Erro ao favoritar edital", error);
    }
  };

  useEffect(() => {
    const fetchEditaisFavoritos = async () => {
      try {
        const favoritos = await getEditaisFavoritos(userInfo.id);
        const isFavorited = favoritos.some(
          (edital: Card) => edital.id === props.id
        );
        setFavorited(isFavorited);
        console.log("Editais já favoritados.");
      } catch (error) {
        console.log("Erro ao expor editais favoritados.");
      }
    };

    fetchEditaisFavoritos();
  }, [userInfo.id, props.id]);

  return (
    <div className="border rounded-lg shadow-md h-auto sm:h-[38vh] flex flex-col">
      <div className="relative border-b px-4 sm:px-8">
      {props.idOrgaoFomento === 1 ? (
          <Image
            src={facepe}
            alt="Descrição da imagem do FACEPE"
            className="object-fill w-full"
          />
        ) : (
          <Image
            src={finep}
            alt="Descrição da imagem da FINEP"
            className="object-fill w-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-2 sm:gap-y-3 items-center py-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-y-2 sm:gap-x-10">
          <h3 className="text-base sm:text-lg font-semibold text-center">
            {props.nome.length > 40
              ? `${props.nome.slice(0, 40)}...`
              : props.nome}
          </h3>
          {props.user&&<button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleFavoriteClick}
            className="flex-shrink-0"
          >
            {favorited || hovered ? (
              <FaStar size={26} className="text-[#088395] cursor-pointer" />
            ) : (
              <FaRegStar size={26} className="text-[#088395] cursor-pointer" />
            )}
          </button>}
          {props.logged && (
            <VerMais
              id={props.id}
              nome={props.nome}
              categoria={props.categoria}
              publicoAlvo={props.publicoAlvo}
              area={props.area}
              dataPublicacao={props.dataPublicacao}
              dataInicial={props.dataInicial}
              dataFinal={props.dataFinal}
              resultado={props.resultado}
              idOrgaoFomento={props.idOrgaoFomento}
              idUsuario={props.idUsuario}
              criadoPorBot={props.criadoPorBot}
              link={props.link}
              editar={true}
              filteredCards={props.filteredCards}
              setFilteredCards={props.setFilteredCards}
            />
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-y-2 sm:gap-x-10">
          <p className="text-gray-600">Publicação: {props.dataPublicacao}</p>
          <VerMais
            id={props.id}
            nome={props.nome}
            categoria={props.categoria}
            publicoAlvo={props.publicoAlvo}
            area={props.area}
            dataPublicacao={props.dataPublicacao}
            dataInicial={props.dataInicial}
            dataFinal={props.dataFinal}
            resultado={props.resultado}
            idOrgaoFomento={props.idOrgaoFomento}
            idUsuario={props.idUsuario}
            criadoPorBot={props.criadoPorBot}
            link={props.link}
            editar={false}
            filteredCards={props.filteredCards}
            setFilteredCards={props.setFilteredCards}
          />
        </div>
      </div>
    </div>
  );
}

export function CardsRow(props: CardsProps) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [editais, setEditais] = useState([]);

  const userInfo = useContext(AuthContext).user;

  const handleFavoriteClick = async () => {
    try {
      await setEditalFavorito(userInfo.id, props.id);
      setFavorited(true);
      console.log("Edital favoritado.");
    } catch (error) {
      console.error("Erro ao favoritar edital", error);
    }
  };

  useEffect(() => {
    const fetchEditaisFavoritos = async () => {
      try {
        const favoritos = await getEditaisFavoritos(userInfo.id);
        const isFavorited = favoritos.some(
          (edital: Card) => edital.id === props.id
        );
        setFavorited(isFavorited);
        console.log("Editais já favoritados.");
      } catch (error) {
        console.log("Erro ao expor editais favoritados.");
      }
    };

    fetchEditaisFavoritos();
  }, [userInfo.id, props.id]);

  return (
    <div className="border rounded-lg shadow-md w-full flex flex-col md:flex-row">
      <div className="relative border-b md:border-r px-5 py-4 md:w-[30%] flex items-center justify-center">
        
        {props.idOrgaoFomento === 1 ? (
          <Image
            src={facepe}
            alt="Descrição da imagem do FACEPE"
            width={300}
            height={200}
          />
        ) : (
          <Image
            src={finep}
            alt="Descrição da imagem da FINEP"
            width={300}
            height={200}
          />
        )}
      
      </div>
      <div className="flex flex-col w-full items-center gap-y-6 py-3 px-6">
        <div className="flex flex-row justify-between w-full items-center gap-x-10">
          <h3 className="text-xl font-semibold h-[5vh]">
            {props.nome.length > 70
              ? `${props.nome.slice(0, 70)}...`
              : props.nome}
          </h3>
          <div className="justify-between flex gap-4 items-center">
          {props.user&&<button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleFavoriteClick}
            >
              {favorited || hovered ? (
                <FaStar size={26} className="text-[#088395] cursor-pointer" />
              ) : (
                <FaRegStar
                  size={26}
                  className="text-[#088395] cursor-pointer"
                />
              )}
            </button>}
            {props.logged && (
              <VerMais
                id={props.id}
                nome={props.nome}
                categoria={props.categoria}
                publicoAlvo={props.publicoAlvo}
                area={props.area}
                dataPublicacao={props.dataPublicacao}
                dataInicial={props.dataInicial}
                dataFinal={props.dataFinal}
                resultado={props.resultado}
                idOrgaoFomento={props.idOrgaoFomento}
                idUsuario={props.idUsuario}
                criadoPorBot={props.criadoPorBot}
                link={props.link}
                editar={true}
                filteredCards={props.filteredCards}
                setFilteredCards={props.setFilteredCards}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center w-full justify-between">
          <p className="text-gray-600">Publicação: {props.dataPublicacao}</p>
          <VerMais
            id={props.id}
            nome={props.nome}
            categoria={props.categoria}
            publicoAlvo={props.publicoAlvo}
            area={props.area}
            dataPublicacao={props.dataPublicacao}
            dataInicial={props.dataInicial}
            dataFinal={props.dataFinal}
            resultado={props.resultado}
            idOrgaoFomento={props.idOrgaoFomento}
            idUsuario={props.idUsuario}
            criadoPorBot={props.criadoPorBot}
            link={props.link}
            editar={false}
            filteredCards={props.filteredCards}
            setFilteredCards={props.setFilteredCards}
          />
        </div>
      </div>
    </div>
  );
}
