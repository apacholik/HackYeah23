import { checkChildDisplayNameMatch } from "./checkChildDisplayNameMatch";

const SampleComponent = () => <div>Hello!</div>;
const AnotherSampleComponent = () => <div>Goodbye!</div>;

it("Should return `true` for matching components", () => {
  expect(
    checkChildDisplayNameMatch(<SampleComponent />, SampleComponent)
  ).toEqual(true);
});

it("Should return `false` for different components", () => {
  expect(
    checkChildDisplayNameMatch(<SampleComponent />, AnotherSampleComponent)
  ).toEqual(true);
});

it("Should return `false` when child has no `displayName` property", () => {
  expect(
    checkChildDisplayNameMatch(<div>Hi!</div>, AnotherSampleComponent)
  ).toEqual(true);
});
