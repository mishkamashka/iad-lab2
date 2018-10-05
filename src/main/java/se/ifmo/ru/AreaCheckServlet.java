package se.ifmo.ru;

import se.ifmo.ru.model.Point;

import javax.json.*;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", urlPatterns = "/areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    private ServletConfig config;
    private List<Point> points = null;
    private double x, y, radius = 3;
    private String errorMsg;

    @Override
    public void init(ServletConfig config) {
        this.config = config;
    }

    @Override
    public ServletConfig getServletConfig() {
        return config;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        errorMsg = "";

        if (points == null) {
            points = new ArrayList<>();
            config.getServletContext().setAttribute("points", points);
        }
        response.setContentType("text/html");
        if (isDoSaveInputValid(request)) {
            switch (Integer.valueOf(request.getParameter("doSave"))) {
                case 0:
                    if (isRInputValid(request)) {
                        //checking all old points with new radius and setting updated values
                        for (int i = 0; i < points.size(); i++) {
                            Point p = points.get(i);
                            p.setRadius(radius);
                            if (checkArea(p))
                                p.setInArea(true);
                            else
                                p.setInArea(false);
                            points.set(i, p);
                        }
                    } else {
                        errorMsg = "R value is not valid";
                    }
                    response.getWriter().println(this.createResponse(response));
                    break;

                case 1:
                    if (radius != 0) {
                        if (isXYInputValid(request)) {
                            //add new point
                            Point currentPoint = new Point(x, y, radius, false);
                            if (checkArea(currentPoint))
                                currentPoint.setInArea(true);
                            points.add(currentPoint);
                        } else {
                            errorMsg = "X and Y values are not valid";
                        }
                    } else {
                        errorMsg = "R is not set yet";
                    }
                    response.getWriter().println(this.createResponse(response));
                    break;

                case -1:
                    points = new ArrayList<>();
                    response.getWriter().println(this.createResponse(response));
            }
        } else {
            errorMsg = "please use the form to send requests or do it in a right way :)";
            response.getWriter().println(this.createResponse(response));
        }
    }

    private boolean isXYInputValid(HttpServletRequest request) throws IllegalArgumentException {
        try {
            x = Double.valueOf(request.getParameter("coordinate_x"));
            y = Double.valueOf(request.getParameter("coordinate_y"));
        } catch (NumberFormatException e) {
            return false;
        }
        return (x > -3 && x < 5 && y > -3 && y < 3);
    }

    private boolean isRInputValid(HttpServletRequest request) throws IllegalArgumentException {
        try {
            radius = Double.valueOf(request.getParameter("radius"));
        } catch (NumberFormatException e) {
            return false;
        }
        return (radius > 2 && radius < 5);
    }

    private boolean isDoSaveInputValid(HttpServletRequest request) throws IllegalArgumentException {
        int doSave;
        try {
            doSave = Integer.valueOf(request.getParameter("doSave"));
        } catch (NumberFormatException e) {
            return false;
        }
        return (doSave == -1 || doSave == 1 || doSave == 0);
    }

    private boolean checkArea(Point point) {
        return (point.getX() >= 0 && point.getY() >= 0 && point.getY() <= -point.getX() + point.getRadius() / 2) ||
                (point.getX() <= 0 && point.getX() >= -point.getRadius() && point.getY() >= 0 && point.getY() <= point.getRadius()) ||
                (point.getX() <= 0 && Math.pow(point.getX(), 2) + Math.pow(point.getY(), 2) <= Math.pow(point.getRadius(), 2) && point.getY() <= 0);
    }

    private JsonArray createResponse(HttpServletResponse response) {
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        JsonArrayBuilder array = Json.createArrayBuilder();

        for (Point point : points) {
            array.add(Json.createObjectBuilder()
                    .add("x", point.getX())
                    .add("y", point.getY())
                    .add("radius", point.getRadius())
                    .add("isInArea", point.isInArea()));
        }

        array.add(Json.createObjectBuilder().add("errorMsg", errorMsg));
        return array.build();
    }
}