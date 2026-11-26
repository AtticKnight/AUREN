from fastapi import APIRouter
from engine.universe import GROUPS, SECTORS
from engine.score import RULE_TABLE
from backend.app.core.config import settings
from backend.app.schemas import (
    PortfolioRequest,
    LiquidityRequest,
    AIReportRequest,
    WalletRequest,
)
from backend.app.services.analytics import (
    compute_portfolio_risk,
    compute_portfolio_liquidity,
    inspect_wallet_address,
    generate_report_narrative,
)

router = APIRouter()


@router.get("/healthz", tags=["Health & Info"])
def health_check():
    """Render/Kubernetes healthcheck endpoint."""
    return {"status": "healthy"}


@router.get("/universe", tags=["Universe"])
def get_universe():
    """Return list of supported tickers, sectors, and curated market groups."""
    return {
        "sectors": SECTORS,
        "groups": GROUPS,
        "supported_tickers": sorted(list(SECTORS.keys())),
    }


@router.post("/risk", tags=["Risk Analytics"])
def compute_risk(payload: PortfolioRequest):
    """Compute comprehensive risk score, volatility, drawdowns, correlation, sector exposures, and scenario stress tests."""
    return compute_portfolio_risk(payload.weights, payload.period)


@router.post("/liquidity", tags=["Liquidity Analytics"])
def compute_liquidity(payload: LiquidityRequest):
    """Calculate liquidity analysis: average daily trading value and estimated days to exit positions."""
    return compute_portfolio_liquidity(
        portfolio_value=payload.portfolio_value,
        weights=payload.weights,
        adv_participation=payload.adv_participation,
        period=payload.period,
    )


@router.post("/wallet", tags=["Wallet"])
def inspect_wallet(payload: WalletRequest):
    """Inspect a public Base EVM address for tokenized stock assets and map them to portfolio weights."""
    rpc = payload.rpc_url or settings.BASE_RPC_URL
    return inspect_wallet_address(payload.address, rpc)


@router.post("/report", tags=["AI Risk Analyst"])
def generate_ai_report(payload: AIReportRequest):
    """Generate an AI risk narrative using LLM (Groq or compatible OpenAI endpoint)."""
    base_url = settings.LLM_BASE_URL
    model = payload.model or settings.LLM_MODEL
    api_key = settings.LLM_API_KEY
    return generate_report_narrative(payload.metrics, model, base_url, api_key)


@router.get("/rules", tags=["Risk Analytics"])
def get_rules():
    """Return risk penalty scoring table and thresholds."""
    return {"rules": RULE_TABLE}
