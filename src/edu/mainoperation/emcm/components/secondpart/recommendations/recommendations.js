import React from 'react';
import { Container, Accordion } from 'semantic-ui-react';

import './recommendations.css';
import '../../back.css';

export default function Recommendations() {
  return (
    <div className="recommendations back">
      <Container>
        <h1 className="recommendations__name">4) Рекомендация алу.</h1>

        <Accordion fluid styled className="recommendations__content__acc">
          <Accordion.Title>4.1 Рекомендация дегеніміз не ?</Accordion.Title>
          <Accordion.Content>
            <p>
              &nbsp;Рекомендация - демоны толық көріп ұнатқан, сатып алған
              немесе алмаған, айналасындағы жаңа технологияға, ден-саулыққа,
              тазалыққа мән беретін таныс, туыс, достарының да бұл демоны көруін
              ұсынған және оның атынан қоңырау шалатын кісілер тізімі.
              Рекомендация алу біздің жұмысымыз үшін өте маңызды. Бұл біздің
              жетістікке жетуімізге тікелей байланысты. Сондықтан да әр бір
              демодан барынша көп рекомендация алуға тырысу керек. Жақсы
              сатушылар әр демоға шаққанда орташа 20, зияраттан 5 рекомендация
              алады.
            </p>
          </Accordion.Content>
          <Accordion.Title>4.2 Рекомендацияның келу жолдары</Accordion.Title>
          <Accordion.Content>
            <p>
              {' '}
              a- Tаныстар тізімі: Жұмысқа жаңадан келген дилер және
              секретаршаның айналасындағы таныс туыс достарының тізімі.
              <br />
              b- Демодан алынған рекомендациялар.
              <br />
              c- Клиент зияратыннан алынған рекомендациялар.
              <br />
              d- Сырттағы адамдардан анкета толтыру арқылы алынған
              рекомендациялар.
              <br />
              e- Мүше болған ұйымдар, клубтар, қауымдастықтардан алынған
              рекомендация.
            </p>
          </Accordion.Content>
          <Accordion.Title>
            4.3 Сапалы рекомендация дегеніміз не?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              {' '}
              &nbsp; &nbsp; Мәдениетті, айналасында танысы, туысы көп, табысты,
              Aura өнімінің демосын көріп ұнатқан және алған кісілердің
              рекомендациясы сапалы рекомендация болады.
              <br />
              1- Рекомендация парағына алғаш жазылғандар.
              <br />
              2- Демоны ұнатқан кісілердің рекомендациясы.
              <br />
              3- Сатып алған кісілердің рекомендациясы.
              <br />
              4- Үйінде аллергия, астма ауруы болған.
              <br />
              5- Туыстығы немесе таныстығы жақын болған.
              <br />
              6- Aura компаниясын марка ретінде таныған.
              <br />
              7- Жаға технологияға қызығатын.
              <br />
              8- Сатып алу деңгейі жоғары.
            </p>
          </Accordion.Content>
          <Accordion.Title>4.4 Рекомендация қалай алынады?</Accordion.Title>
          <Accordion.Content>
            <p>
              Рекомендация алған кезде бірінші клиенттің айтқандарын
              рекомендация парағына жазып алу керек. Рекомендация алынып болған
              соң потенциалды клиенттердің:
              <br />
              &nbsp; &nbsp;1) Жұбайы немесе зайыбының есімдері
              <br />
              &nbsp; &nbsp;2) Туыстығы
              <br />
              &nbsp; &nbsp;3) Қайда тұратыны
              <br />
              &nbsp; &nbsp;4) Roboclean-ді сатып алу мүмкіндігі жайында
              мағлұматтарды міндетті түрде сұрап алу керек. Міне осы кезде ғана
              бұл толыққанды рекомендацияға жатады.
              <br />
              Егер олардың рұқсатынсыз рекомендация беруге қарсылық білдірсе
              берген кісілерге өзінің бірінші хабарласып, олардың келісімі
              болғаннан соң ғана қоңырау шалатыныңызды айтыңыз.
            </p>
            <p>
              Клиенттің рекомендация көп беруі үшін оған көмекші болып жол
              көрсетіңіз және көп рекомендация беруіне ынталандырырыңыз.
            </p>
            <p>
              &nbsp; &nbsp;Сіз қазір таныс, туыс, жекжат, бауыр, көрші, кластас,
              университеттегі группаластар, коллегалар, құдалар барлығын шетінен
              жазып бере беріңіз. Өзіңіз ескерткеннен кейін ішінен қайсысына
              хабарласуға болатынын белгілеп аламын да, соларға хабарласамын.
              <br />
              &nbsp; &nbsp;Берік, той жасасақ жүзден көп адам шақырамыз ғой.
              Солардың ішінен әзірге 30 шақты адам жазып берсеңіздер жеткілікті.
              Телефоннан қарасаңыздар оңай еске түседі.
              <br />
              &nbsp; &nbsp;Компаниямызда жақсы акция бар. Сіздердің берген
              таныстарыңыздан Roboclean-ді алып жатса, әр бір кісі үшін сіздерге
              30 мың теңге сыйақы берілетін болады. Өте керемет акция. 12 айды
              төлеп болғаннан кейін де таныстарыңыз кызығып, сатып аламын деп
              жатса, әр уақытта маған хабарласыңыздар. Әр бір сатылған Roboclean
              үшін 30 мың теңге қолма қол алып отырасыз және де бұл 10 жыл болса
              да осылай жалғаса береді.
              <br />
              Тек Алматы ғана емес, басқа қалалардан да таныстарыңыз алып жатса
              30 мың теңге сыйақы берілетін болады.
            </p>
          </Accordion.Content>
        </Accordion>
      </Container>
    </div>
  );
}
