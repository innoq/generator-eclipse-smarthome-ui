/**
 * Copyright (c) 2014-2015 openHAB UG (haftungsbeschraenkt) and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 */
package <%= bundleName %>.internal;

import org.osgi.service.component.ComponentContext;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class <%= appClassName %> {

    public static final String WEBAPP_ALIAS = "/<%= uiPath %>";
    private final Logger logger = LoggerFactory.getLogger(<%= appClassName %>.class);

    protected HttpService httpService;

    protected void activate(ComponentContext componentContext) {
        try {
            httpService.registerResources(WEBAPP_ALIAS, "web", null);
            logger.info("Started <%= uiName %> UI Servlet at " + WEBAPP_ALIAS);
        } catch (NamespaceException e) {
            logger.error("Error during servlet startup for <%= uiName %> UI Servlet", e);
        }
    }

    protected void deactivate(ComponentContext componentContext) {
        httpService.unregister(WEBAPP_ALIAS);
        logger.info("Stopped <%= uiName %> UI Servlet");
    }

    protected void setHttpService(HttpService httpService) {
        this.httpService = httpService;
    }

    protected void unsetHttpService(HttpService httpService) {
        this.httpService = null;
    }

}
