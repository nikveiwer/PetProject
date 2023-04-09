// import { useEffect, useState } from 'react';

// import { PetsFetching } from '../../service/fetching';

// import { PetCard } from '../mainPage/PetCard';
// import { SkeletonCard } from '../mainPage/SkeletonCard';

// import { ICurrentFilters, isAnimals } from '../../types/types';
// import { IAnimals } from '../../types/types';
// import { IPetCard } from '../../types/types';

// import { observer } from 'mobx-react-lite';
// import { useAuthStore } from '../../store/authStore/authStore';
// import { useFiltersStore } from '../../store/filtersStore/filtersStore';

// const AvailableLikedCards: React.FC = () => {
//     switch (status) {
//         case 'loading':
//             return (
//                 <div className=" py-9 px-3 grid lg:grid-cols-4 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1 grid-rows-3 auto-rows-auto justify-between justify-items-center gap-7 ">
//                     {[...new Array(12)].map((item, i) => {
//                         return <SkeletonCard key={i}></SkeletonCard>;
//                     })}
//                 </div>
//             );
//         case 'idle':
//             return (
//                 <div className="  py-9 px-3 grid min-[1630px]:grid-cols-4 lg:grid-cols-3 min-[873px]:grid-cols-4 min-[683px]:grid-cols-3 min-[455px]:grid-cols-2 grid-cols-1  grid-rows-3 auto-rows-auto justify-between justify-items-center gap-7 ">
//                     {pets.map(({ id, name, imagePath }) => {
//                         return (
//                             <PetCard key={id} id={id} imagePath={imagePath} name={name}></PetCard>
//                         );
//                     })}
//                 </div>
//             );
//         case 'error':
//             return <div>Ошибка</div>;
//         default:
//             return <div>Ошибка</div>;
//     }
// };

// export default observer(AvailableLikedCards);
