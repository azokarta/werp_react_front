import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './carpetShow.css';

import carpet1 from '../../../../assets/8.1.jpg';
import carpet2 from '../../../../assets/8.2.jpg';
import carpet3 from '../../../../assets/8.3.jpg';
import carpet4 from '../../../../assets/8.4.jpg';

export default function CarpetShow() {
  return (
    <div className="carpet">
      <Container textAlign="justified">
        <h1 className="carpet__name">8 Carpet show.</h1>
        <p className="carpet__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты кілемдегі шаң-тозаң мен құмды
          көрсету, оны тазалау қиындығын түсіндіру және Робоклин арқылы олардан
          оңай әрі тиімді құтылу жолын көрсету.
        </p>
        <Accordion fluid styled>
          <Accordion.Title>8.1 Кіріспе.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  (Roboclean-егі су ауыстырылады)
                  <br />
                  <i>
                    &nbsp; Қарапайым шаңсорғыш кілемімізді тазалай алмайтынын
                    көрдік. Кілемнің түбіне шаң жиналып, уақыт өте құмға тола
                    бастайды. Құм кілем түгін қырқып, уақыт өте, тақыр болып,
                    сапасы нашарлайды деген сөз. Оның үстіне, кілемнен
                    көтерілген шаң ауамызды ластап, аллергия болу қауіпін
                    туғызады. Кілемнің арасындағы шаңды тазалау үшін оның түгін
                    тарап, қағу керек. Кілемді сыртқа шығарып қағатын кездеріңіз
                    болады ма? Кілемдерімізді далаға шығарып қағудың өзі үлкен
                    жұмыс. Үлкен ауыр кілемдерді далаға шығару қолайсыз әрі
                    ауыр. Оны қағам деп шаңнын быразын өзіміз жұтамыз, быразы
                    қайта кілемге жабысады, әйтеуір шаңы бітпесе де шаршаған соң
                    қайта үйге әкеле саламыз, солай емес пе? Алина генеральный
                    уборка жасайтын кезде, Берік, бүгіннен бастап бұл
                    проблемалардың барлығын ұмытасыздар. Себебі қолымызда Power
                    Nozzle насадкасы бар. Бұл кілемді жатқан жерінен минутына
                    7000 рет қағады, түктерін тарайды, түбіндегі құм, шаңдардың
                    барлығын Roboclean-нің бачогына жинайды. Бұдан былай
                    тазалықты рахатықпен жасайсыздар.
                    <br />
                    &nbsp; Ал енді осыны іс жүзінде көрейік. Бұл жерде бар
                    болғаны екі-ақ кнопканы бассаңыз болды Roboclean іске
                    қосылады.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={carpet1} alt="carpet1" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>8.2 Power Nozzle-мен кілем қағу.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Бүгіннен бастап бұл проблемалардың барлығын
                    ұмытасыздар. Себебі қолымызда Power Nozzle насадкасы бар.
                    Бұл кілемді жатқан жерінен минутына 7000 рет қағады,
                    түктерін тарайды, түбіндегі құм, шаңдардың барлығын
                    Roboclean-нің бачогына жинайды. Бұдан былай тазалықты
                    рахатықпен жасайсыздар.
                    <br />
                    &nbsp; Ал енді осыны іс жүзінде көрейік. Бұл жерде бар
                    болғаны екі-ақ кнопканы бассаңыз болды Roboclean іске
                    қосылады.
                    <br />
                  </i>
                  (Roboclean-ді клиентке беріп, кілемнің жартысын тазалауын
                  өтініңіз)
                </p>
                <p>
                  <i>
                    &nbsp; Берік, кілемді минутына 7000 рет қағып, түктерін
                    тарап, түбіндегі құм, шаңдардың барлығын Roboclean-нің
                    бачогына жинап жатыр. Далаға шығарып қаққанға қарағанда
                    әлдеқайда тиімді, әлдеқайда ыңғайлы.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={carpet2} alt="carpet2" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>8.3 Суды көрсету, мысалдар келтіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    (Суды көрсеткенде 3 секунд үнсіз қалу керек. Фонарьды
                    бачоктың жанынан, сосын астынан жағып, бачоктың түбіндегі
                    құм көрсетіледі)
                    <br />
                    <i>
                      &nbsp; Кілемнің жартысының өзінен осыншама ластық шықса,
                      толық тазаласақ бұдан да лас болар еді. Мына лай суды
                      далада жатса, аяқ киімімізбен баспаймыз. Өкінішке орай бұл
                      ластықты байқамай күнде үйімізде басып жүрміз. Ал
                      балаларымыз да осның үстінде ойнап жүр ғой, дұрыс па? Мына
                      құмдар кілеміміздің өмірін азайтады, ал мынау шаңдар болса
                      денсаулығымызға зиян келтіреді. Кілеміміз құртылатын болса
                      лақтырып жаңасын алармыз, бірақ денсаулығымызды ше? Көріп
                      отырған мына ластық құрғақ күйінде ауаға ұшып, өкпемізге
                      жиналып жатыр. Аллергия, астмамен ауратындардың санының
                      көбейуінің бірден-бір себебі үйімізде дұрыс тазалық
                      системаның болмауында. Алматы қаласында әр бір үш семияның
                      біреуі аллергия болса, олардың 70-80 проценті әйелдер мен
                      балалар. Ал біз болсақ кілемімізді тазалады деп пылесосқа
                      сеніп жүрміз. Roboclean-нің көмегімен екі-ақ кнопканы
                      басып, воростарын тарап, минутына 7 мың рет қағып, шаңның
                      бәрін суға жинап аласыз. Кілемнің қаншалықты
                      тазаланғандығы судан көрініп тұрады.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image src={carpet3} alt="carpet3" size="big" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Су үйіміздің тазалығының индикаторы. Roboclean үйде
                      шынайы тазалық жасағандықтан Қазақстандағы номері бірінші
                      аппарат ретінде қаншама рет жыл таңдауы номинациясын
                    </i>
                    (Choice of year)
                    <i>
                      жеңіп алды. Сапасы мен атқаратын қызметі үшін Италияның
                      Design Award, Германиәның Kema Keur, Tuv, және Еуропаның
                      аллергология орталығының Ecarf, Zpmed сертификаттарымен
                      марапатталды. Мұнымен қоса, адамдарда көп сұраныс
                      тудыруының себебі алу жолдарының өте ыңғайлы болуында.
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>8.4 Sell Closing сұрағы</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Roboclean кетсе үйімізде мына ластық қалады, ал
                    Roboclean қалса мына ластық кетеді, бүгіннен бастап үйімізде
                    ластық қалсын ба немесе Roboclean қалсын ба?
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image src={carpet4} alt="carpet4" size="big" />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}
