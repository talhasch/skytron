import React from 'react';

import { Queue } from '../../store/queue/types';

import Indicator from '../indicator';

import link from '../../helper/link';
import BtnCopy from '../btn-copy';

import filename from '../../util/filename';

import { fileSvg, fileCheckSvg } from '../../svg';

interface Props {
  queue: Queue,
  resetQueue: () => void
}

export default class UploadQueue extends React.Component<Props> {

  clear = (e: React.MouseEvent) => {
    e.preventDefault();

    const { resetQueue } = this.props;
    resetQueue();
  };

  render() {
    const { queue } = this.props;

    if (queue.length === 0) {
      return null;
    }

    const inProgress = queue.find(x => !x.done) !== undefined;
    const allLinks = queue.map(x => x.link ? link(x.link) : '').join("\n");
  console.log(allLinks)
    return (
      <div className="queue">
        {!inProgress && (
          <div className="queue-menu">
            <a href="#" onClick={this.clear}>Clear</a>
            {queue.length > 1 && (<BtnCopy value={allLinks}><a href="#">Copy all</a></BtnCopy>)}
          </div>
        )}

        {queue.map(task => {

          if (task.failed) {
            return <div className="task" key={task.id}>
              <div className="icon-indicator failed">{fileSvg}</div>
              <div className="task-info">
                <div className="filename">{filename(task.path)}</div>
                <div className="failed">Transfer failed.</div>
              </div>
            </div>;
          }

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
