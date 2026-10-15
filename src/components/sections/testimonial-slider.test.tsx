import { act, fireEvent, render, screen } from "@testing-library/react";
import { TestimonialSlider } from "./testimonial-slider";

const data = [
  { quote: "Quote one", name: "A One", role: "CEO", company: "Co1" },
  { quote: "Quote two", name: "B Two", role: "CTO", company: "Co2" },
  { quote: "Quote three", name: "C Three", role: "COO", company: "Co3" },
];

describe("TestimonialSlider", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("shows the first testimonial and a zero-padded counter", () => {
    render(<TestimonialSlider testimonials={data} />);
    expect(screen.getByText("Quote one")).toBeInTheDocument();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("goes to the next testimonial", () => {
    render(<TestimonialSlider testimonials={data} />);
    fireEvent.click(screen.getByRole("button", { name: /next testimonial/i }));
    expect(screen.getByText("Quote two")).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("wraps from the first testimonial back to the last", () => {
    render(<TestimonialSlider testimonials={data} />);
    fireEvent.click(screen.getByRole("button", { name: /previous testimonial/i }));
    expect(screen.getByText("Quote three")).toBeInTheDocument();
  });

  it("advances automatically after the interval", () => {
    render(<TestimonialSlider testimonials={data} interval={5000} />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText("Quote two")).toBeInTheDocument();
  });

  it("pauses automatic advance while hovered", () => {
    render(<TestimonialSlider testimonials={data} interval={5000} />);
    fireEvent.mouseEnter(screen.getByRole("region", { name: /testimonials/i }));
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.getByText("Quote one")).toBeInTheDocument();
  });
});
