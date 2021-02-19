import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFastBackward,
  faFastForward,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Pagination.module.scss';

const Pagination = ({ data, root }) => {
  const { page, pages, prev, next } = data;

  const pagesArray = [];

  for (let i = 0; i < pages; i++) {
    pagesArray.push(i + 1);
  }

  const pagesArrayLength = pagesArray.length;

  const pagesItems = (pagesAvailableArray) =>
    pagesAvailableArray.map((pagesPage) => (
      <li className={styles.item} key={pagesPage}>
        {pagesPage !== page && !isNaN(pagesPage) ? (
          <Link href={`/${root}/${pagesPage}`}>
            <a className={`${styles.link} ${styles.clickable}`}>
              <div className={styles.text}>{pagesPage}</div>
            </a>
          </Link>
        ) : (
          <div
            className={`${styles.link} ${
              !isNaN(pagesPage) ? styles.active : ''
            }`}
          >
            <div className={styles.text}>{pagesPage}</div>
          </div>
        )}
      </li>
    ));

  const pagesAvailable = () => {
    const pagesAvailableArray = [];

    if (pagesArrayLength > 5) {
      if (
        page !== pagesArrayLength - 4 &&
        page !== pagesArrayLength - 3 &&
        page !== pagesArrayLength - 2 &&
        page !== pagesArrayLength - 1 &&
        page !== pagesArrayLength
      ) {
        pagesAvailableArray.push(pagesArray[page - 1]);
        pagesAvailableArray.push(pagesArray[page]);
        pagesAvailableArray.push('...');
        pagesAvailableArray.push(pagesArray[pagesArrayLength - 2]);
        pagesAvailableArray.push(pagesArray[pagesArrayLength - 1]);

        return pagesItems(pagesAvailableArray);
      }

      pagesAvailableArray.push(pagesArray[pagesArrayLength - 5]);
      pagesAvailableArray.push(pagesArray[pagesArrayLength - 4]);
      pagesAvailableArray.push(pagesArray[pagesArrayLength - 3]);
      pagesAvailableArray.push(pagesArray[pagesArrayLength - 2]);
      pagesAvailableArray.push(pagesArray[pagesArrayLength - 1]);

      return pagesItems(pagesAvailableArray);
    }

    pagesArray.map((pagesPage) => pagesAvailableArray.push(pagesPage));

    return pagesItems(pagesAvailableArray);
  };

  return (
    <div className={styles.pagination}>
      <ul className={styles.list}>
        <li className={styles.item}>
          {page !== pagesArray[0] ? (
            <Link href={`/${root}/${pagesArray[0]}`}>
              <a className={`${styles.link} ${styles.clickable}`}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faFastBackward} />
                </div>
              </a>
            </Link>
          ) : (
            <div className={`${styles.link} ${styles.disabled}`}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faFastBackward} />
              </div>
            </div>
          )}
        </li>
        <li className={styles.item}>
          {prev ? (
            <Link href={`/${root}/${prev}`}>
              <a className={`${styles.link} ${styles.clickable}`}>
                <div className={`${styles.icon} ${styles.small}`}>
                  <FontAwesomeIcon icon={faStepBackward} />
                </div>
              </a>
            </Link>
          ) : (
            <div className={`${styles.link} ${styles.disabled}`}>
              <div className={`${styles.icon} ${styles.small}`}>
                <FontAwesomeIcon icon={faStepBackward} />
              </div>
            </div>
          )}
        </li>
        {pagesAvailable()}
        <li className={styles.item}>
          {next ? (
            <Link href={`/${root}/${next}`}>
              <a className={`${styles.link} ${styles.clickable}`}>
                <div className={`${styles.icon} ${styles.small}`}>
                  <FontAwesomeIcon icon={faStepForward} />
                </div>
              </a>
            </Link>
          ) : (
            <div className={`${styles.link} ${styles.disabled}`}>
              <div className={`${styles.icon} ${styles.small}`}>
                <FontAwesomeIcon icon={faStepForward} />
              </div>
            </div>
          )}
        </li>
        <li className={styles.item}>
          {page !== pagesArrayLength ? (
            <Link href={`/${root}/${pagesArrayLength}`}>
              <a className={`${styles.link} ${styles.clickable}`}>
                <div className={styles.icon}>
                  <FontAwesomeIcon icon={faFastForward} />
                </div>
              </a>
            </Link>
          ) : (
            <div className={`${styles.link} ${styles.disabled}`}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faFastForward} />
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
