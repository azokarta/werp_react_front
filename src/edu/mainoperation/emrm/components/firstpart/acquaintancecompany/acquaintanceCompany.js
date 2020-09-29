import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { EDU_ROBO_ASSETS_URL } from '../../../../../../utils/constants';

import './acquaintance.css';
import '../../back.css';

export default function AcquaintanceCompany() {
  return (
    <div className="acquaintance back">
      <Container>
        <h1 className="acquaintance__name">2) Компаниямен таныстыру.</h1>
        <Grid columns={2} textAlign="justified" verticalAlign="middle">
          <Grid.Column className="acquaintance__content">
            <h2>Aura компаниясы</h2>
            <p>
              &nbsp;«Aura» неміс маркасы, әлемде қырық бестен астам елдерде
              дистрибьюторлары бар. Европа, Америка, Азияның көптеген елдерінде
              өз қызметін атқарып келеді. Соның бірі «Аура Қазақстан» орталық
              Азияда тікелей, эксклюзивті дистрибьютор болып табылады, яғни
              Қырғыстан, Өзбекстан, Тәжікістан, Азербайжан елдері және
              Қазақстанның (Астана, Қарағанды, Өскемен, Тараз, Шымкент,
              Қызылорда, Ақтау, Атырау, Орал, Ақтобе, Талдықорған) барлық ірі
              қалаларында филиалдары бар. Орталығы да Алматы қаласында мамыр 4
              ықшам ауданында орналасқан.
              <br /> &nbsp; Aura компаниясы адам денсаулығы үшін аса маңызды су
              тазалау жүйесі Cebilon мен көп функционалды тазалық жүйесі
              Roboclean аппараттарын сату және сервистік қызмет көрсетумен
              айналысады. Aura компаниясы маркетинг және сервистік қызметі
              бойынша әлемде 3-ші орында, ал Орта Азияда 1-орынға ие. Сатып
              алушылардың көп болуы - тауардың сапасы мен сервистік қызметтің
              жоғарғы деңгейде екендігін көрсетеді. Aura компаниясының
              Қазақстанда жұмыс істеп жатқанына 17 жылдан асты, осы 17 жылдың
              ішінде 200 мыңнан астам клиенттеріміз бар, барлығы дерлік өте
              риза. Осыншама уақыт атқарған маркетингтің және сервистік
              қызметінің нәтижесінде алты рет жыл таңдауы (выбор года)
              номинациясын жеңіп алды.
            </p>
          </Grid.Column>
          <Grid.Column className="acquaintance__image">
            <Image
              src={`${EDU_ROBO_ASSETS_URL}u31.jpg`}
              alt="u31"
              size="large"
              centered
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
