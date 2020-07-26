/**
 *	2020.07.25
 *	웹뷰 어플리케이션에서 경로 정보를 네이티브 메세지로 받았을 때 이를 하위 iframe에게 전달하기 앞서
 *	데이터를 가공하고 편집, 저장한 뒤 사용자 GPS 상태에 따라 갱신하는 기능을 담당하는 컴포넌트를 개발한다.
 */

import DUMMY from "./test_data/route_response";
import { Application } from "@/js/components/Application";

(function() {
	const { features } = DUMMY;

	const e = { latitude: 14145975, longitude: 4515203 };

	const app = new Application;
	app.reset(features);

	console.log(app);
	console.log(app.getEntireRoutes());
})();
