import React from 'react';
import { Container, Image, Grid, Accordion } from 'semantic-ui-react';

import './introDevice.css';
import '../../../back.css';

import { EDU_CEB_ASSETS_URL } from '../../../../../../../utils/constants';

export default function IntroDevice() {
  return (
    <div className="introdevice back">
      <Container textAlign="justified">
        <h1 className="introdevice__name">5. Аппаратты таныстыру</h1>
        <p className="introdevice__content">
          &nbsp; &nbsp; Бұл бөлімнің мақсаты - клиентті Cebilon Unique
          аппаратымен таныстырып, оның атқаратын қызметін түсіндіру.
        </p>
        <Accordion fluid styled className="introdevice__content__acc">
          <Accordion.Title>
            5.1. Cebilon Unique аппаратын таныстыру.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; «Cebilon Unique» аппараты екі бөліктен тұрады,
                    аппарат және кран. Аппарат ас үйдегі мойкаңыздың астына
                    орнатылып, күнделікті қолданып жүрген краныңызға паралельно
                    екінші кран орнатылады. Бұл «Cebilon» аппаратының алтыншы
                    поколениясы, яғни соңғы моделі. Бұл жерде «Cebilon Unique»
                    аппаратының атқарып жатқан қызметін тікелей мына электронды
                    дисплей арқылы көруіңізге болады. «Cebilon Unique» аппараты
                    өзінің ерекше дизайнымен әлемдік көрмелерде «Good Design»,
                    «German Design», «А Design», «Design Türkey»
                    сертификаттарымен марапатталған.
                    <br /> &nbsp; «Cebilon Unique» аппаратын кішігірім завод деп
                    айтсақта болады. Өйткені краннан ағып тұрған суыңызды бес
                    сатылы молекулярлық деңгейде тазалап, қазіргі тассай, вита,
                    калипсо суларынан да жоғары сападағы таза әрі балғын суды,
                    күнделікті үйіңізде 250 литрге дейін шығарып береді. Яғни
                    «Cebilon Unique» аппаратын орнатумен су тасу, сатып алу
                    немесе қайнату сияқты проблемалардың барлығынан біржолата
                    құтыласыз.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}5.1.jpg`}
                  alt="introdevice1"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>5.2. Алғашқы үш фильтрді таныстыру.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Ал енді «Cebilon Unique» тің ішкі құрылысына
                      келетін болсақ, аппарат төрт фильтр және бір мембрана
                      системасынан тұрады. Бұл жерде, алдын ала тазартуға
                      арналған үш фильтр көріп тұрсыз. Бұл фильтрлер,
                      полипропилен материалынан жасалынып, суымызды құбырлар
                      арқылы келетін механикалық ірі заттардан тазалайды. Су
                      1-ші бес микронды осадочный фильтрге келіп туседі. Микрон
                      дегеніміз өлшем бірлік, яғни 1 мм = 1000 микронға тең. Бұл
                      жерде судың құрамындағы тас, құм, тот, қақ, лай секілді
                      механикалық ірі заттардан тазалайды.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_CEB_ASSETS_URL}5.2.jpg`}
                    alt="introdevice2"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Сонан соң су 2-ші, құрамында 0,3% күміс иондары бар
                      активті көмір фильтріне келіп түседі. Активті көмір судың
                      құрамындағы хлордан, жағымсыз иістерден, темір иісінен
                      және суымыздың дәміне әсер ететін органикалық заттармен
                      қоспаларды толығымен тазалайды, ал күміс иондары судағы
                      бактерияларды жояды. Одан кейін су 3-ші, бір микронды
                      осадочный филтьрге келіп түседі. Бұл фильтр бірінші
                      фильтрге қарағанда бес есе тығыз, яғни судағы көлемі 1
                      микронға дейінгі асбест, коллоид, балшық сияқты ұсақ
                      заттарды тазартады. Үш фильтрден өткен су, құрамындағы
                      механикалық ірі заттардан, хлордан, жағымсыз иістерден
                      тазарып, суымыз мөлдір болады. Бірақ әлі де ішуге
                      жарамсыз. Бұл үш фильтрлер судың құрамындағы бір микроннан
                      үлкен ірі заттарды өзіне ұстап, кейінгі фильтрлердің жұмыс
                      істеу қызметін ұзарту үшін арналған. Ал бір микроннан кіші
                      тұз молекулалары, вирус пен бактериялар, шлак токсиндер,
                      ауыр металдар, канцерогенді химикаттар бұл фильтрлерде
                      толық тазаланбайды. Сондықтан мұндай картриждік
                      фильтрлердің біреуін емес онын алып қойсақ та, өкінішке
                      орай әлі де таза суға қол жеткізе алмаймыз.
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>5.3. Кері осмостық мембрана.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Үш фильтрден тазаланып өткен су, аппараттың жүрегі,
                      яғни молекулярлық деңгейде тазалауға арналған, негізгі
                      тазартқыш системасы кері осмостық мембранаға келеді.
                      «R.O.S» дегеніміз, лас суды қайта өңдеу мағынасын
                      білдіреді. Мына жерде АҚШ тың жалауын көріп тұрғаныңыздай
                      бұл мембрана, ең алдымен «NASA» ғарыш агенттігінде,
                      ғарышкерлерге арналып шығарылған. Өзіңіз білетіндей
                      ғарышта су көзі болмағандықтан, ғарышкерлер өздерімен
                      белгілі мөлшерде ғана су алып кетеді. Олар қолданған лас
                      суларын төкпей бір резервуарға жинап, кейіннен сол лас
                      суды кері осмостық мембрана арқылы қайта тазартып өңдеп
                      отырады.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_CEB_ASSETS_URL}5.3.jpg`}
                    alt="introdevice3"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Сондай-ақ кері осмостық мембрана су асты
                      кемелерінде де қолданылады. Өйткені бәрімізге белгілі
                      мұхиттің немесе теңіздің сулары тұзды болады. Осы кері
                      осмостық мембрананың көмегімен теңіздің ащы суын тұщы суға
                      айналдырып, ауыз су ретінде пайдаланады. Сол сияқты кері
                      осмостық мембрананың жұмыс істеу принципі қазіргі
                      медицинадағы гемодиализ деген қан тазалайтын апаратта да
                      қолданылады. Гемодиализ таза қанды бір бөлек, токсин
                      шлактарды бір бөлек шығарып, қанның құрамындағы улы
                      метаболикалық өнімдерді жояды. Бұл жердегі кері осмостық
                      мембрана да дәл осындай принціппен жұмыс істейді. Көріп
                      тұрғаныңыздай су бір жерден кіріп, екі жерден шығады. Яғни
                      мембранаға келген судың құрамындағы лас заттарды
                      канализацияға жіберіп, ішуге жарамды таза суды аппараттың
                      арнайы резервуарына жинайды. Мембрананың су өткізгіш
                      порасы 10 ангстремнен тұрады. Ангстрем - әлемдегі ең кіші
                      өлшем бірлік, яғни 1 ангстрем = 1 мм/10.000.000 ға тең.
                      Мысалы мына стаканның көлемін 10 ангстрем деп алатын
                      болсақ, су молекуласының өлшем бірлігі 5 – 6 ангстремді
                      құрайды. Ал адам ағзасына қажетті Mg, Ca ,Na, K секілді
                      минералдың өлшем бірлігі 7 – 8 ангстремді құрайды.
                      Нәтижеде су молекуласы мен адам ағзасына қажетті
                      минералдар бұл 10 ангстремдік поралардан кіші болғандықтан
                      емін - еркін өте алады. Судың құрамындағы бактерия мен
                      вирустар, канцерогенді химикаттар, тұздар, органикалық
                      және биологиялық қоспалар, шлак токсиндер, радиоактивті
                      қалдықтар, ауыр металдар, қорғасын, мыс, кадмий, сынап,
                      мышьяк, пестицид сияқты жүздеген зиянды элементтердің
                      ешқайсысы бұл мембрананың порасынан өте алмайды. Неліктен,
                      өйткені бұлардың ішіндегі ең кіші вирустің өзі 50
                      ангстрем, ал бактерия 150 - 200 ангстремнен жоғары болады.
                      Зиянды элементтер, мембрананың су өткізгіш порасынан 5
                      есе, 10 есе үлкен болғандықтан, кері осмос мембрананың
                      көмегімен ұсталынып, канализацияға жіберіледі. Нәтижесінде
                      кері осмос жүйесi судың барлық табиғи қасиеттері мен
                      құрылымын сақтап, бұлақ суының дәмiндей таза су шығарады.
                      Таза болғаны соншалық, тіпті қайнатуды да қажет етпейді.
                      Сондықтан бүгінгі таңдағы кері осмос жүйесі су тазалаудағы
                      ең озық және ең сенімді технология болып табылады.
                      <br />
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>5.4. Резервуар. </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Тазаланған су резервуарға жиналады. Резервуар арнайы
                    материалдан жасалынып, суға зиян беретін әр түрлі сыртқы
                    факторлардан қорғайды. Көлемі сегіз литр, мұның жеті литрі
                    су, қалған бір литрі қысымдалған ауадан тұрады.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}5.4.jpg`}
                  alt="introdevice4"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            5.5. РН деңгейін реттеуші бесінші фильтр.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Резервуар мен кранның ортасында 5 ші фильтр
                    орналасқан. Бұл кокос қабықшасының активтелген көмірі мен
                    күміс ионынан жасалған. Кокос қабықшасы суға жағымды дәм
                    берсе, күміс ионы бактерияны жоюға көмектеседі. Сондай - ақ
                    ішіндегі минералданған рH стабилизаторы, мембранадан шыққан
                    суды табиғи кальцит минералымен байытып, тазартылған судың
                    рН деңгейін реттейді. Нәтижесінде «Cebilon Unique» аппараты
                    отбасыңызға әрдайым әлемдік стандарттарға сай таза және
                    балғын бұлақтың суын беріп отырады.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}5.5.jpg`}
                  alt="introdevice5"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            5.6. Помпа, датчик давления, антипотоп құрылғылары.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Нарықтағы көптеген фильтрлерде антипотоп құрылғысы
                    болмағандықтан оны орнатқан кісілердің үйлерін су басып,
                    мебелдері суда қалып, тіпті төмендегі көршісінің үйіне дейін
                    өтіп, шығындалып жатқан отбасыларды кездестіріп жатамыз. Ал
                    «Cebilon Unique» тің басқа апараттардан ерекшелігі нарықтағы
                    фильтрлерде кездеспейтін 2 жақты электронный және
                    механический антипотоп құрылғысы орнатылған. Қандай да бір
                    апатты жағдай болған кезде аппараттың екі жақты клапандары
                    автоматты түрде жабылып, үйіңіздің су басуына жол бермейді.
                    Ал мына помпа, датчик давленияның көмегімен резервуарды
                    автоматты түрде толтырып отырады.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}5.6.jpg`}
                  alt="introdevice6"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>5.7. Қорытынды</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Су фильтрінің сапалы болуымен қатар, оның
                      жабдықтары да денсаулығымызға қауіпсіз болуы өте маңызды.
                      Мына жерде «Cebilon Unique» аппаратына NSF сертификаты
                      берілген. Ол орталығы АҚШ-та орналасқан халықаралық
                      деңгейдегі ең беделді және тәуелсіз мекеме. NSF ұйымы су
                      фильтрмен қоса оның ішіндегі барлық жабдықтарына да
                      сертификат береді. Алайда бұл сертификатты алу өте қиын.
                      Өйткені тексерілген, зерттелген өнім белгіленген
                      стандарттарқа сай болуы керек. NSF ұйымы тарапынан
                      «Cebilon Unique» аппаратының әр бір бөлшегінің
                      материалдары және пластикдердің құрамы тексеруден өтіп,
                      халықаралық стандарттар талабына сай, экологиялық таза
                      өнім болғандықтан NSF 58 сертификаты берілген.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_CEB_ASSETS_URL}5.7.jpg`}
                    alt="introdevice7"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Ал нарықтағы басқа фильтрлердің NSF сертификаты жоқ
                      немесе ішіндегі бір - екі бөлшегінде ғана болуы мүмкін. Ал
                      бұл сол бөлшектің ғана жарамды екенін көрсетеді. Бұны
                      фильтрде толықтай NSF сертификаты бар сияқты таныстырып,
                      тұтынушыларды жаңылтуда. Су фильтрлері адам денсауылығына
                      тікелей әсер еткендіктен, фильтрлер мен бөлшектерінің
                      материалдары және оның құрамы міндетті түрде тексеріліп,
                      гигиеналық нормаларға сай болуы керек.
                      <br />
                      &nbsp; Мұнымен қатар адам денсаулығы мен қоршаған ортаға
                      зиян тигізбейтін, аз қуат тұтынатын өнім ретінде
                      Германияның «TÜV Rheinland» сертификаты да берілген.
                      Даулет Айдана, «Cebilon Unique» аппаратының жұмыс істеу
                      қызметі мен ерекшеліктерін сіздерге түсіндіре алдым ба?
                      <br />
                      &nbsp; Cebilon Unique Аппараттың бағасы 1500 доллар. Оны
                      жеткізу, орнату қызметі осы бағаның ішіне кіреді. Cebilon
                      Unique аппаратына үш жыл кепілдік беріледі. Одан әрі
                      қаншама жыл қолдансаңыз да сервистік қызмет үздіксіз
                      көрсетілетін болады. Аппаратқа жылына бір рет
                      диагностикалық қызмет жүргізіледі. Мұнымен қоса басқа
                      жерге көшетін болсаңыздар монтаж – демонтаж қызметтерін де
                      атқарады.
                    </i>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}
