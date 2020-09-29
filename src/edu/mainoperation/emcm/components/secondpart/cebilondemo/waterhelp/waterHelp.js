import React from 'react';
import { Container, Grid, Accordion, Image } from 'semantic-ui-react';

import './waterHelp.css';
import '../../../back.css';

import { EDU_CEB_ASSETS_URL } from '../../../../../../../utils/constants';

export default function WaterHelp() {
  return (
    <div className="waterhelp back">
      <Container textAlign="justified">
        <h1 className="waterhelp__name">9. Судың кермектігі</h1>
        <p className="waterhelp__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты - судың кермектігін айта келе,
          бекітілген стандарттармен таныстыру. Судың кермектігін тәжірибе
          жүзінде көрсету және денсаулыққа тигізетін әсерін түсіндіру.
        </p>
        <Accordion fluid styled className="waterhelp__content__acc">
          <Accordion.Title>9.1. Кермек су.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Мына қолымдағы реагент арқылы судың кермектігін
                      тексереміз. Егер де судың құрамында ауыр металдар мен
                      кальций және магний тұздары нормадан көп болса, бұл су
                      «кермек су» болып есептеледі. Айдана, жалпы кермек судың
                      белгілерін күнделікті өмірде де білуге болады. Көрген
                      боларсыз, суды қайнатқан кезде бұл ауыр металдар мен
                      тұздар шәйнектің түбіне қақ болып тұрып қалады.
                      <br /> &nbsp;Сонымен бірге судағы осы ауыр металдар мен
                      тұздардың әсерінен тұрмыста қолданатын кір жуғыш және ыдыс
                      жуғыш машинамыз, электр шәйнегі мен үтіктерімізге де қақ
                      тұрып, тесіктері бітеліп көпке шыдамай жұмыс істеу мерзімі
                      қысқаруда.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_CEB_ASSETS_URL}9.1.jpg`}
                    alt="waterhelp1"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp;Айдана, жалпы үйдегі тұрмыстық техникаларыңызды бұл
                      қақтардан қорғау үшін не пайдаланасыз?
                      <br /> &nbsp; Ал енді дәл осы қақ күнделікті шәй –тамақпен
                      бірге біздің де ағзамызға кіріп жатқан жоқ па? Ағзамызды
                      бұл қақтан қалай тазалаймыз? Тағы да сол калгон немесе
                      финишті қолданбаймыз ғой, дұрыс па? Осы судың құрамындағы
                      ауыр металдар мен тұздар тек үйдегі техникамызды бұзып
                      қана қоймай, денсаулығымызға да қауіп төндіруде. Мұндай
                      судың кесірінен тері тесіктері бітеліп дерматит, бөртпе
                      және басқа да проблемалар тудыруда. Шаш пен бас терісіне
                      де әсер етіп, бастың құрғап қышуына, қайзақтың пайда
                      болуына әкеліп соқтырады. Ал ең қауіптісі, қатты су
                      құрамындағы тұздар адам ағзасына жиналып, бүйрек
                      тастарының пайда болуына және жүрек-қан тамырларының
                      бітелуіне әкеліп соқтырады.
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>9.2. Стандарттар.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Даулет Айдана, мына жерде судың кермектілік деңгейіне
                    байланысты «Дүниежүзілік Денсаулық сақтау Ұйымының»
                    стандарттары көрсетілген. 0-4 dH аралығы жұмсақ су, 4-7 dH
                    аралығы орташа кермек су, 7-10 dH аралығы кермек су, ал 10
                    dH-нан жоғары болса шамадын тыс кермек су болып есептеледі.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}9.2.jpg`}
                  alt="waterhelp2"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>9.3. Судың кермектігін тексеру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Ал енді судың кермектігін тексеру үшін мына «буфер
                      индикаторы» мен «титірлеу» ерітіндісін пайдаланамыз.
                      Алдымен мына пробирканың біреуіне кран суын, ал екіншісіне
                      фильтр суын 5 мг/ нан құямыз. Бұл суларға бірінші «буфер
                      индикаторы» ерітіндісінен әрқайсысына үш тамшыдан қосып,
                      екі суды күлгін – қызғылт түске өзгертіп аламыз. Міне
                      көріп тұрғаныңыздай пробиркадағы сулардың екеуде бірдей
                      күлгін – қызғылт түске өзгерді. Ал енді осы судың түсі,
                      жасыл – көк болғанға дейін «титірлеу» ерітіндісін тамшылап
                      қосамыз. Әр бір тамшы саны, судың қанша есе кермек
                      екендігін көрсетеді. Алдымен кран суының кермектігін
                      тексерейік.Екі тамшы тамыздық, бір шайқап көрейік.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_CEB_ASSETS_URL}9.3.jpg`}
                    alt="waterhelp3"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Көріп тұрғанымыздай түсі еш өзгерген жоқ. Ал енді
                      тағы төрт тамшы қосайық. Барлығы алты тамшы болды. Түсі
                      өзгерді ме? Олай болса тағы үш тамшы қосып көрейік.
                      Барлығы тоғыз тамшы болды. ДДҰ - ның берген стандарты
                      бойынша қай категорияға жатады? Бұл - су құрамындағы ауыр
                      металдар мен зиянды тұздардың шамадан тыс көп екенін
                      көрсетеді.
                      <br /> &nbsp; Ал енді фильтр суын тексерейік. Міне
                      қараңыздар, бір тамшы қостық. Бар болғаны бір тамшының
                      өзінде жасыл – көк түске өзгерді. Айдана, «Cebilon Unique»
                      аппаратының тазалаған суы қай категорияға жатады?
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>9.4. Мысалдар келтіру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Көріп тұрғаныңыздай ДДҰ – ның берген стандарты
                    бойынша кран суы сегіз есе кермек екендігін көрсетіп тұр.
                    Мұндай суды қолданудың нәтижесінде шәйнегімізге қақтың
                    отыруы, одан да маңыздысы бұл суды ішкенде ауыр металдар мен
                    зиянды тұздар ағзамызға кіріп, жаңа айтып өткендей түрлі
                    ауруларға жол ашуы мүмкін. Ал «Cebilon Unique» аппараты
                    ағзамызды бұл проблемалардан қорғап, қатты суды бұлақтың
                    жұмсақ суына айналдырады. Бұл сумен дайындаған тамақ пен
                    шәйіңіздің сапасы жақсарып өте дәмді болады. Тері мен шашты
                    жақсы күйде сақтайды. Қолымызды, бетімізді осы жұмсақ суға
                    жуған кезде теріміз ылғалданып, жүзіміз жарқырап сыртта
                    сатылып жатқан кремдердің ешқайсысына керек қалмайды.
                    Сонымен бірге электр шәйнектер мен үтіктерімізді ұзақ уақыт
                    қолданып, ақшамызды үнемдеуге мүмкіндік береді.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}9.4.jpg`}
                  alt="waterhelp4"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>9.5. Қорытынды. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; «Cebilon Unique» бүкіл отбасының денсаулығы үшін
                    қажет. Себебі, жұмсақ су қуық жолдары мен бүйректерімізде
                    тастың байлануына мүлдем жол бермейді. Ал енді бала
                    шағамызыдың бақыты, болашағы олардың денсаулығына тікелей
                    байланысты емес пе? Өз отбасымыздың денсаулығын,
                    қауіпсіздігін бізден басқа кім ойлайды? Даулет Айдана,
                    барлығымыз бала шағаның денсаулығы деп жүрміз ғой солай емес
                    пе? Давайте бүгіннен бастап бұлақтың жұмсақ суы, үйіңізде
                    ағып тұруы үшін, сіздерге ыңғайлы бөліп төлеу жолын жасап
                    берейін.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}9.5.jpg`}
                  alt="waterhelp5"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}
