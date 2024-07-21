import React from 'react';
import PropTypes from 'prop-types';
import { Notebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeCardItem = ({ resume }) => {
  return (
    <Link to={'/dashboard/resume/' + resume.documentId + '/edit'}>
      <div className='p-14 mt-5 border items-center flex bg-secondary rounded-lg justify-center h-[220px] w-[180px] cursor-pointer border-primary hover:scale-105 transition-all hover:shadow-md shadow-primary'>
        <Notebook />
      </div>
      <div className="flex justify-center items-center mt-2">
        <div className="w-full max-w-[160px] px-2 overflow-hidden whitespace-nowrap text-ellipsis text-center">
          <h2 className="truncate">{resume.title}</h2>
        </div>
      </div>
    </Link>
  );
};

ResumeCardItem.propTypes = {
  resume: PropTypes.shape({
    title: PropTypes.string.isRequired,
    documentId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResumeCardItem;
