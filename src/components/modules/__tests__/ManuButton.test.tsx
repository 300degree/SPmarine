import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import ManuButton from "../ManuButton"
import { CiPaperplane } from "react-icons/ci";
import { routers } from "../../../common/constants/routes"


describe("ManuButton Component", () => {
    it("renders correctly with icon and message", () => {
      render(
        <BrowserRouter>
          <ManuButton path={routers.orders} message="Orders" Icon={CiPaperplane} />
        </BrowserRouter>
      )
  
      expect(screen.getByRole("button")).toBeInTheDocument()
  
      expect(screen.getByText("Orders")).toBeInTheDocument()
    })

    it("has correct link", () => {
        render(
          <BrowserRouter>
            <ManuButton path={routers.orders} message="Orders" Icon={CiPaperplane} />
          </BrowserRouter>
        )
    
        const link = screen.getByRole("link")
        expect(link.getAttribute("href")).toBe(`/${routers.orders}`)
    })
})
