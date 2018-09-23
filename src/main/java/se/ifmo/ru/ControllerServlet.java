package se.ifmo.ru;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ControllerServlet", urlPatterns = "/controllerServlet")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getServletContext().getRequestDispatcher("/areaCheckServlet").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("x_coordinate") != null && request.getParameter("y_coordinate") != null && request.getParameter("radius") != null)
            request.getServletContext().getRequestDispatcher("/areaCheckServlet").forward(request, response);
        else
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);

    }
}
