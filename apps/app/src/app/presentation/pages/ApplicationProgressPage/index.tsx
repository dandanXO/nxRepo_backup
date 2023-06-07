import moment from 'moment-timezone';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useLazyGetUserProcessQuery } from '../../../api/rtk';
import { Navigation } from '../../components/layouts/Navigation';
import { PageContent } from '../../components/layouts/PageContent';
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
          currentData?.map((news) => {
            return (
              <ProgressItem
                title={news.title}
                content={news.content}
                date={moment(news.addTime).format('DD-MM-YYYY HH:mm:ss')}
              />
            );
          })
        }
        {/*{!currentData && <div>No Data</div>}*/}
      </PageContent>
    </div>
  );
};

export default ApplicationProgressPage;
