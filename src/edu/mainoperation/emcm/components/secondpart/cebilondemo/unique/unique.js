import React from 'react';
import { Container, Accordion, Image, Grid } from 'semantic-ui-react';

import './unique.css';
import '../../../back.css';
import { EDU_CEB_ASSETS_URL } from '../../../../../../utils/constants';

export default function Unique() {
  return (
    <div className="unique back">
      <Container>
        <h1 className="unique__name">
          А) «Cebilon Unique» аппаратының ерекшеліктері мен сертификаттары.
        </h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <p className="unique__content">
                <i>
                  &nbsp;Қандай да бір зат алар кезде көрінісіне және бағасына
                  қарап шешім қабылдасақ, қателесуіміз әбден мүмкін. Өйткені
                  сыртқы көрініс бізді жаңылту мүмкін. Филтьр сатып аларда ішкі
                  құрылысы мен дайындалған материалдарының сапасына және ол
                  фильтрден шыққан судың сапасына аса мән беруіміз керек.
                  <br />
                  &nbsp;Cebilon Unique аппаратының лабораториялық зерттеуден
                  өткен сертификаттары да бар. Олардың бірі Германияның «SGS»
                  сертификаты. Бұл әлемге танымал тәуелсіз тестілеу және
                  сертификаттау қызметтерін ұсынатын халықаралық компания. SGS -
                  тің әлемге ұсынатын негізгі қызметі, сатылатын өнімнің
                  сапасын, денсаулық пен қоршаған ортаға қауіпсіздігін және
                  нормативтік стандарттарға сәйкес келетіндігін тексеру. Көріп
                  тұрғаныңыздай халықаралық «SGS» ұйымы «Cebilon Unique»
                  аппаратынан шыққан судың үлгісіне тексеру және зерттеу
                  жұмыстарын жүргізіп, оған арнайы сапа сертификаты берілген.
                  Мұнымен қоса, Астана қаласындағы, Қазақстан Республикасы
                  Президентінің «Санитарлық эпидемиологиялық сараптама орталығы»
                  тарапынан «Cebilon Unique» аппаратынан шыққан судың сапасы
                  санитарлы - химиялық, микробиологиялық зерттеулерден өтіп, су
                  сапасының барлық стандарттарға сәйкестігі жөнінде арнайы
                  сертификат берілді.
                  <br />
                  &nbsp;Бізге фильтрдің көбі қытайдан келеді. Олар өзін мықты
                  компания ретінде таныстырып, арзан фильтрлерін асыра мақтап,
                  қымбатқа сатуда. Мұндай сертификаттары болмаған фильтрдің
                  арзан болуы былай тұрсын, тіпті тегін берседе үйіме қондырып,
                  ол фильтрдің ішінен шыққан суды бала-шағама ішкізбес едім.
                  Өйткені қытай ойыншықтарының пластиктерінен балдардың
                  уланғанын, ыдыс-аяғынан радиация шыққандығын бағдарламалардан
                  өзіміз де көріп жүрміз. Мен өз отбасымның денсаулығы үшін
                  арнайы сараптамалардан өткен, халықаралық және Қазақстандық
                  стандарттарға сай, сертификаттармен мақұлданған фильтрдің суын
                  таңдар едім.
                </i>
              </p>
            </Grid.Column>
            <Grid.Column className="unique__image">
              <Image
                src={`${EDU_CEB_ASSETS_URL}u1.jpg`}
                alt="u1"
                size="large"
                centered
              />
              <Image
                src={`${EDU_CEB_ASSETS_URL}u2.jpg`}
                alt="u2"
                size="large"
                centered
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
