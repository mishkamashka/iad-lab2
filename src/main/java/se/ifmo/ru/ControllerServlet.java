package se.ifmo.ru;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("x_coordinate") != null && request.getParameter("y_coordinate") != null && request.getParameter("radius") != null) {
            AreaCheckServlet areaCheckServlet = new AreaCheckServlet();
            areaCheckServlet.doPost(request, response);
        }
    }
}
