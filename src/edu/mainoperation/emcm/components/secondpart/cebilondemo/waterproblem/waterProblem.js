import React from 'react';
import { Container, Grid, Image, Accordion } from 'semantic-ui-react';

import './waterProblem.css';
import '../../../back.css';

import { EDU_CEB_ASSETS_URL } from '../../../../../../../utils/constants';

export default function WaterProblem() {
  return (
    <div className="waterproblem back">
      <Container textAlign="justified">
        <h1 className="waterproblem__name">4. Ауыз су проблемасы</h1>
        <p className="waterproblem__content">
          &nbsp; &nbsp; Бұл бөлімде ауыз су проблемасы туралы сөз қозғалады.
          Яғни клиенттің бүгінгі таңда тұтынып жүрген ауыз суының денсаулыққа
          қаншалықты зиянды екенін түсіндіру керек .
        </p>
        <Accordion fluid styled className="waterproblem__content__acc">
          <Accordion.Title>
            4.1. Су құрамындағы ластаушы заттар.{' '}
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  <i>
                    &nbsp; Су мөлдір болып көрінгенімен бұның құрамында қаншама
                    көзге көрінбейтін, адам ағзасына кері әсерін тигізетін: ауыр
                    металдар, шлак токсиндер, бактерия мен вирустар, микробтар,
                    пестицидтер, радиоактивті қалдықтар, канцерогенді химикаттар
                    тіпті керексіз мөлшерде тұздардың барлығы осы су арқылы
                    біздің ағзамызға кіруде.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}4.1.jpg`}
                  alt="wp1"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>
            4.2. Судың ластануы және су құбырлары.
          </Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Column width="8" verticalAlign="middle">
                <p>
                  (Демобуктан ашып)
                  <i>
                    &nbsp;Пайдаланылып отырған ауыз судың 70 пайызы – жерасты
                    суы, ал 30 пайызы – тау суларынан келеді. Бүгінкі күнде
                    суымызда 800 ден астам ластаушы табылып, олардың саны күннен
                    күнге артуда. Жалпы ауыз суымыздың ластануына бірнеше фактор
                    әсер етеді. Мысалы, су қоймаларының ашық болуы, су
                    құбырларының корозиялық тозуы, автокөліктердің улы газдары,
                    ауыл шаруашылығындағы химиялық тыңайтқыштар, автомойкадан
                    немесе завод фабрикалардан шығатын түтіндер мен қалдықтар,
                    ішіп отырған суымызды ластауының кесірінен, адам ағзасында
                    көптеген аурулар тудыруда. Үйімізге дейін келіп жатқан ауыз
                    судың ластануының бірден – бір себебі, қаламызда су жүретін
                    құбырлардың 80 пайызға жуығы ескіріп, тат басып
                    ауыстырылмағандықтан. Мамандар, жер асты қубырларының
                    жарамдылық мерзімі не бәрі 20 жыл екендігін айтады. Бірақ
                    оған қарамастан, бұл құбырлар соңғы 40 - 50 жылдан бері,
                    яғни Д. Қонаевтің заманынан бері мүлдем ауыстырылмаған.
                  </i>
                </p>
              </Grid.Column>
              <Grid.Column width="8">
                <Image
                  src={`${EDU_CEB_ASSETS_URL}4.2.jpg`}
                  alt="wp2"
                  size="big"
                />
              </Grid.Column>
            </Grid>
          </Accordion.Content>
          <Accordion.Title>4.3. Лас судан туындайтын аурулар.</Accordion.Title>
          <Accordion.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column width="8" verticalAlign="middle">
                  <p>
                    <i>
                      &nbsp; Кран суының құрамында денсаулыққа зиянды шлак
                      токсиндер, вирустар, микробтар, хлор, ауыр метал тұздары
                      және темір қалдықтарының ерітінділері жиі кездеседі.
                      Құбырлар мен келетін мұндай сапасыз судың салдары, неше
                      түрлі ауруларға жол ашып, тіпті адам бүйрегі мен қуыққа
                      тастың жиналуына әкеліп соқтырады. Өйткені сапасы нашар
                      ауыз судың кесірінен бүгінде көп таралып отырған дерттің
                      бірі – бүйрек пен қуық аурулары. Уролог мамандарының
                      айтуынша, қаламызда бүйрек пен қуық ауруларының көрсеткіші
                      соңғы 5 жылда 8%-ға өскен.
                    </i>
                  </p>
                </Grid.Column>
                <Grid.Column width="8">
                  <Image
                    src={`${EDU_CEB_ASSETS_URL}4.3.jpg`}
                    alt="wp3"
                    size="big"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <p>
                    <i>
                      &nbsp; Жарбосынов атындағы урология бөлімінің меңгерушісі,
                      әрі біздің клиентіміз Гүлнар Асқадірқызы теледидардан
                      берген интерьвюында: «Бүйрек пен қуықта тас байлануына зат
                      алмасу процессінің бұзылуы, асқазан ішек жолдары
                      қызметінің бұзылуы сияқты көптеген себептер бар. Дегенмен
                      елімізде бұл аурудың туындауына 80 пайыз ішіп отырған
                      суымыздың сапасыздығы себеп болып отыр. Өткен жылы біздің
                      бөлімде шамамен 600 дей адам емделіп шықты» дейді. Ал енді
                      Қазақстанда қаншама аурухана бар, соның бәрінде урология
                      бөлімдері бар, сол жерде бүйрегі бұрап, қуығына тас
                      байланып, несеп жолдары бітеліп, одан емделіп жатқан
                      науқастардың санын, өздеріңіз ойланып көріңіздерші.
                      Дәрігерлер, егер де бүйректегі тастың мөлшері 1 см ге
                      дейін болса, оны ұсақтап түсіру мүмкін, ал егер тастың
                      көлемі 1см-ден үлкен болса, міндетті түрде операция
                      жасатуға тура келеді дейді.
                    </i>
                  </p>
                  <p>
                    <i>
                      &nbsp; Бұрын экология мен судың сапасы таза болатын.
                      Табиғи, яғни ешқандай химикатсыз жеміс - жидектер жеп,
                      таза бұлақтың суын ішетін. Ол кезде ешқандай су
                      сатылмайтын. Сондықтан да қазіргі таңда ең танымал қан
                      қысымының көтерілуі, бүйрекке тас жиналуы, қуық жолдарының
                      бітелуі немесе қатерлі ісік сияқты аурулардың ешқайсысы
                      бұрын кездеспейтін. Ал қазір экологияның ластануы мен
                      ескі, тозығы жеткен құбырлардың кесірінен ішіп жатқан
                      суымыздың сапасы қаншама есе нашарлап кетті.
                    </i>
                    <br />
                    <i>
                      &nbsp; Олай болса, отбасымыздың денсаулығына қауіп
                      төндіретін мұндай аурулардың алдын алу үшін, міндетті
                      түрде күнделікті ішіп отырған ауыз суымызды тазартуымыз
                      керек. Бүгін мен сіздерге су тазалау жүйелерінің ең жоғары
                      технологиясы «Cebilon Unique» R.O.S системасын алып келіп
                      отырмын.
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
