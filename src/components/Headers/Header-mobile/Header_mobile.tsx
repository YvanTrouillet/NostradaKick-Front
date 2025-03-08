import "./Header_mobile.scss";
import pictoHome from "../../../assets/Header/picto_home.svg";
import pictoProfil from "../../../assets/Header/picto_profil.svg";
import pictoRank from "../../../assets/Header/picto_rank.svg";
import pictoResult from "../../../assets/Header/picto_result.svg";
import Submenu from "./Submenu/Submenu";
import { useState } from "react";
import { NavLink } from "react-router";

interface IPropsHearderMobile {
	setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
	setShowPredict: React.Dispatch<React.SetStateAction<boolean>>;
	setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ({
	setShowStats,
	setShowPredict,
	setShowSettings,
}: IPropsHearderMobile) {
	const [isShowSubmenu, setIsShowSubmenu] = useState(false);

	function handleShowSubmenu(
		event: React.MouseEvent<HTMLLIElement, MouseEvent>,
	) {
		event.preventDefault();
		setIsShowSubmenu(!isShowSubmenu);
	}

	return (
		<div className="menu__mobile">
			{isShowSubmenu && (
				<Submenu
					setIsShowSubmenu={setIsShowSubmenu}
					setShowStats={setShowStats}
					setShowPredict={setShowPredict}
					setShowSettings={setShowSettings}
				/>
			)}
			<header className="header">
				<nav className="header__nav">
					<ul className="header__nav__list">
						<li className="header__nav__list__item">
							<NavLink
								to="/predictions"
								className="header__nav__list__item__link"
							>
								<img
									src={pictoHome}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
						<li className="header__nav__list__item">
							<NavLink
								to="/resultats"
								className="header__nav__list__item__link"
							>
								<img
									src={pictoResult}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
						<li className="header__nav__list__item">
							<NavLink
								to="/classement"
								className="header__nav__list__item__link"
							>
								<img
									src={pictoRank}
									alt=""
									className="header__nav__list__item__link__img"
								/>
							</NavLink>
						</li>
						<li
							className={
								isShowSubmenu
									? "header__nav__list__item header__nav__list__item--background"
									: "header__nav__list__item"
							}
							onClick={handleShowSubmenu}
							onKeyDown={() => setIsShowSubmenu(!isShowSubmenu)}
						>
							<img
								src={pictoProfil}
								alt=""
								className="header__nav__list__item__link__img"
							/>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}
