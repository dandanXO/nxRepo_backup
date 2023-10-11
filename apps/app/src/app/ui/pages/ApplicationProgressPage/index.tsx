import moment from 'moment-timezone';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useLazyGetUserProcessQuery } from '../../../externel/backend/rtk';
import { formatDate } from '../../../modules/format/formatDate';
import { Navigation } from '../../core-components/Navigation';
import { PageContent } from '../../core-components/PageContent';
import { ProgressItem } from './ProgressItem';

const ApplicationProgressPage = () => {
  const navigate = useNavigate();
  const [trigger, { currentData }] = useLazyGetUserProcessQuery();

  useEffect(() => {
    trigger({});
  }, []);

  return (
    <div>
      <Navigation
        title={'Application progress'}
        back={() => {
          navigate(-1);
        }}
      />
      <PageContent>
        {currentData &&
          currentData?.map((news, index) => {
            return (
              <ProgressItem
                isHightlight={index === 0}
                title={news.title}
                content={news.content}
                date={moment.unix(Number(news.addTime)).format('DD-MM-YYYY HH:mm:ss')}
              />
            );
          })}
        {/*{!currentData && <div>No Data</div>}*/}
      </PageContent>
    </div>
  );
};

export default ApplicationProgressPage;
