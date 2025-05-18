package com.eventos.application.ports.input;

public interface ReportInputPort {
    byte[] generateReportForEvent(Long eventId);
}
