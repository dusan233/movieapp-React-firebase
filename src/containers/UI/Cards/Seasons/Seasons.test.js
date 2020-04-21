import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Seasons from "./Seasons";
import { tsPropertySignature } from "@babel/types";

configure({ adapter: new Adapter() });

describe("<Seasons />", () => {
  it("what should be done", () => {
    const wraper = shallow(<Seasons />);
    expect(wraper.find(".Card")).toHaveLength(1);
  });
  it("what should be done", () => {
    const wraper = shallow(<Seasons />);
    
    expect(wraper.contains()).toHaveLength(1);
  });
});
