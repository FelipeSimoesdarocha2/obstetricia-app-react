import React, { useRef, useState } from "react";

import { NavLink } from "react-router-dom";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import styles from "./Welcome.module.scss";

import video from "../../../../../assets/video.mp4";

function Welcome() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  function openInNewTab(id: number) {
    switch (id) {
      case 1:
        return window.open(
          "https://intercom.help/obstcare/pt-BR/articles/7190669-como-adicionar-uma-paciente",
          "_blank"
        );
      case 2:
        return window.open(
          "https://intercom.help/obstcare/pt-BR/articles/7190667-como-e-a-experiencia-de-minhas-gestantes",
          "_blank"
        );
      case 3:
        return window.open(
          "https://intercom.help/obstcare/pt-BR/articles/8287587-como-funciona-o-monitoramento-remoto",
          "_blank"
        );

      case 4:
        return window.open(
          "https://intercom.help/obstcare/pt-BR/articles/8287564-posso-acessar-a-obstcare-de-dispositivos-moveis-como-smartphones-e-tablets",
          "_blank"
        );
      case 5:
        return window.open(
          "https://intercom.help/obstcare/pt-BR/articles/8287553-a-obstcare-protege-os-dados-das-minhas-pacientes",
          "_blank"
        );

      case 6:
        return window.open(
          "https://intercom.help/obstcare/pt-BR/articles/8287536-a-obstcare-e-de-graca",
          "_blank"
        );
      default:
        return null;
    }
  }

  return (
    <div className={styles.container}>
      <h1>Seja bem vindo(a) ao OBSTCARE!</h1>

      <div className={styles.video}>
        <video ref={videoRef} width={477} height={269}>
          <source src={video} type="video/mp4" />
          <track
            src="caminho/do/arquivo.vtt"
            kind="captions"
            label="Português"
            srcLang="pt"
            default
          />
        </video>

        <div className={styles.controls}>
          {!isPlaying && (
            <button type="button" aria-label="Play" onClick={playVideo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="29"
                viewBox="0 0 25 29"
                fill="none"
              >
                <path
                  d="M25 14.5L0.25 28.7894L0.25 0.210581L25 14.5Z"
                  fill="#223C5F"
                />
              </svg>
            </button>
          )}
          {isPlaying && (
            <button
              type="button"
              className={styles.pauseButton}
              aria-label="Pause"
              onClick={pauseVideo}
            >
              Pause
            </button>
          )}
        </div>
      </div>

      <p>
        Você ainda não está acompanhando nenhuma paciente,
        <br />
        vamos cadastrar uma?
      </p>

      <span className={styles.highlight}>
        Dica: cadastre-se como paciente usando seu mesmo e-mail de médico,
        <br />
        baixe o app e vivencie a experiência que suas gestantes vão viver! Leva
        <br />
        menos de 5 minutos e você poderá ver a interação em tempo real entre
        <br />
        app e web!
      </span>

      <NavLink to="/patients/add">
        <PersonAddIcon />
        <span style={{ whiteSpace: "nowrap" }}>Adicionar Paciente</span>
      </NavLink>

      <br />

      <a
        href="https://intercom.help/obstcare/pt-BR/articles/7190669-como-adicionar-uma-paciente"
        className={styles.link}
        target="blank"
      >
        <p className={styles.doubts}>Está com dúvidas?</p>
      </a>

      <ul>
        {/* eslint-disable  */}
        <li
          style={{ cursor: "pointer", fontWeight: 700, color: "#1A535C" }}
          onClick={() => openInNewTab(1)}
        >
          Como adicionar minha primeira paciente?
        </li>
        <li
          style={{ cursor: "pointer", fontWeight: 700, color: "#1A535C" }}
          onClick={() => openInNewTab(2)}
        >
          Como é a experiência de minhas gestantes?
        </li>
        <li
          style={{ cursor: "pointer", fontWeight: 700, color: "#1A535C" }}
          onClick={() => openInNewTab(3)}
        >
          Como funciona o monitoramento remoto?
        </li>
        <li
          style={{ cursor: "pointer", fontWeight: 700, color: "#1A535C" }}
          onClick={() => openInNewTab(4)}
        >
          Posso acessar a ObstCare de dispositivos móveis, como smartphones e
          tablets?
        </li>
        <li
          style={{ cursor: "pointer", fontWeight: 700, color: "#1A535C" }}
          onClick={() => openInNewTab(5)}
        >
          A ObstCare protege os dados das minhas pacientes?
        </li>
        <li
          style={{ cursor: "pointer", fontWeight: 700, color: "#1A535C" }}
          onClick={() => openInNewTab(6)}
        >
          A ObstCare é de graça?
        </li>
        <li>
          Entre em contato com um consultor através do ícone no canto inferior
          direito da tela.
        </li>
      </ul>
    </div>
  );
}

export default Welcome;
