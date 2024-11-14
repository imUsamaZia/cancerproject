'use client';
import Categories from '../components/Categories';
import LocationBox from '../components/LocationBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  addLocation,
  addKeyword,
} from '@/features/filter/candidateFilterSlice';
import SpecializationsBox from '../components/SpecializationsBox';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const FilterSidebar = (props) => {
  const { cancers, locations, specialities, filter } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const {
    category: specializations,
    keyword,
    location,
  } = useSelector((state) => state.candidateFilter) || {};

  //
  const mainKeyword = query ? query : keyword;

  const SpecializationsHandler = ({ name }) => {
    dispatch(addCategory(name));
  };

  useEffect(() => {
    dispatch(addCategory(''));
    dispatch(addLocation(''));
    dispatch(addKeyword(''));
  }, []);

  return (
    <div className="inner-column pd-right sticky ">
      <h2 className="top_heading"> Top Cancer Doctors </h2>
      <div className="filters-outer mb-h-100vh">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023 z-100"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.26732 27.4167L0.583984 24.7334L11.3173 14L0.583984 3.26671L3.26732 0.583374L14.0007 11.3167L24.734 0.583374L27.4173 3.26671L16.684 14L27.4173 24.7334L24.734 27.4167L14.0007 16.6834L3.26732 27.4167Z"
              fill="#22218C"
            />
          </svg>
        </button>
        {/* End .close filter */}

        <div className="filter-block custom-filter-block">
        <h2 className="top_heading hide_dp"> Top Cancer Doctors </h2>
          <div className=" relative">
            <h4>{filter?.cancerHeading || 'Cancer Type'}</h4>
          </div>
          <div className="form-group">
            <Categories cancers={cancers} />
          </div>
        </div>

        <div className="filter-block">
          <div className=" relative custom-filter-block">
            <h4>{filter?.specializationHeading || 'Specialization'} </h4>
          </div>
          <div className="form-group">
            <SpecializationsBox
              specialities={specialities}
              SpecializationsHandler={SpecializationsHandler}
              specializations={specializations}
            />
          </div>
        </div>

        <div className="filter-block">
          <div className=" relative custom-filter-block">
            <h4>{filter?.locationHeading || 'Location'} </h4>
          </div>
          <div className="form-group">
            <LocationBox locations={locations} />
          </div>
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary bg-theme-color rounded-50 w-100 mb-3 custom-see-filter mb-hidden "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            See Doctors
          </button>
          {specializations === '' && location === '' && mainKeyword === '' ? (
            <></>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary bg-theme-color rounded-50 w-100 custom-see-filter desktop-hidden"
                onClick={() => {
                  dispatch(addCategory(''));
                  dispatch(addLocation(''));
                  dispatch(addKeyword(''));
                  router.push('/doctors');
                }}
              >
                Reset filter
              </button>

              <button
                type="button"
                className="mb-hidden text-center text-theme underline clear-btn"
                onClick={() => {
                  dispatch(addCategory(''));
                  dispatch(addLocation(''));
                  dispatch(addKeyword(''));
                  router.push('/doctors');
                }}
              >
                Reset filter
              </button>
            </>
          )}
        </div>
      </div>
      {/* Filter Outer */}
    </div>
  );
};

export default FilterSidebar;
