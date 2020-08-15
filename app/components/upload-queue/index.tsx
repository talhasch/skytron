import React from 'react';

import { Queue } from '../../store/queue/types';

import Indicator from '../indicator';

import link from '../../helper/link';
import BtnCopy from '../btn-copy';

import filename from '../../util/filename';


import { fileSvg, fileCheckSvg } from '../../svg';

interface Props {
  queue: Queue
}

export default class UploadQueue extends React.Component<Props> {
  render() {
    const { queue } = this.props;

    if (queue.length === 0) {
      return null;
    }

    return (
      <div className="queue">
        {queue.map(task => {
          const fullLink = task.done && task.link ? link(task.link) : '';

          return <div className="task" key={task.id}>
            <div className={`icon-indicator ${task.done ? 'done' : ''}`}>
              {task.done ? fileCheckSvg : fileSvg}
            </div>
            <div className="task-info">
              <div className="filename">{filename(task.path)}</div>
              {(() => {
                if (task.done) {
                  return <div className="link"><a href={fullLink}>{fullLink}</a></div>;
                }

                if (task.progress === 100) {
                  return <div className="status">processing</div>;
                }

                return <div className="status">{`${task.progress}%`}</div>;
              })()}
            </div>

            {!task.done && (
              <div className="progress-indicator">
                <Indicator/>
              </div>
            )}

            {task.done && (
              <div className="copy">
                <BtnCopy value={fullLink}/>
              </div>
            )}
          </div>;
        })}
      </div>
    );
  }
}
