import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBarGameTemplate = () => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [firstSegment, setFirstSegment] = useState('');
  const location = useLocation();

  const splitCamelCase = (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');
  };

  useEffect(() => {
    // Define route to progress mapping
    const routeToProgress: any = {
      "/strengths": 0,
      "/strengths/clifton": 10,
      "/strengths/gallup": 10,
      "/solutions": 20, 
      "/solutions/emotional": 30,
      "/solutions/mental": 40,
      "/solutions/physical": 50,
      "/solutions/relations": 60,
      "/questions": 70,
      "/actions": 80,
      "/gameCreationPage": 90,
      "/creatorFinalPage": 100
    };

    const pathname = location.pathname;

    // Extract the first segment
    const pathSegments = pathname.split('/').filter(segment => segment);
    const firstSegmentCamelCase = pathSegments[0];
    const firstSegment = splitCamelCase(firstSegmentCamelCase).join(' ');


    // Find progress for the current path
    let progress = 0;
    for (const route in routeToProgress) {
      const routePattern = new RegExp(`^${route.replace(/:[^\s/]+/g, '[^/]+')}$`);
      if (routePattern.test(pathname)) {
        progress = routeToProgress[route];
        break;
      }
    }

    setCurrentProgress(progress);
    setFirstSegment(firstSegment); // Set the first segment for display

  }, [location.pathname]);

  return (
    <div className='progress_bar_wrapper'>
      <div className="progress-bar__wrapper">
        <label className="progress-bar__value" htmlFor="progress-bar">{firstSegment.toUpperCase()}</label>
        <progress id="progress-bar" value={currentProgress} max="100"></progress>
      </div>
    </div>
  );
}

export default ProgressBarGameTemplate;
